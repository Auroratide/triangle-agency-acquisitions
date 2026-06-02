import MarkdownIt from "markdown-it"
import type { StateCore } from "markdown-it/index.js"

let currentImageMap: Map<string, string> = new Map()

const md = new MarkdownIt({
	html: true,
	breaks: true,
	linkify: true,
})

md.renderer.rules.hr = () => '<div class="page-break"></div>\n'

const defaultImageRenderer = md.renderer.rules.image
if (defaultImageRenderer) {
	md.renderer.rules.image = (tokens, idx, options, env, self) => {
		const token = tokens[idx]
		const src = token.attrGet("src") ?? ""

		if (src.startsWith("image:")) {
			const key = src.slice(6)
			const dataUrl = currentImageMap.get(key) ?? ""
			const alt = self.renderInlineAsText(token.children ?? [], options, env)
			return `<img src="${md.utils.escapeHtml(dataUrl)}" alt="${md.utils.escapeHtml(alt)}">`
		}

		return defaultImageRenderer(tokens, idx, options, env, self)
	}
}

const createSpecialList =
	(
		name: string,
		symbols: string[],
		bulletClasses: Record<string, string> = {},
	) =>
	(state: StateCore) => {
		const { Token, tokens } = state

		for (let i = 0; i < tokens.length; i++) {
			if (tokens[i].type !== "inline") continue

			const lines = tokens[i].content.split("\n")
			if (
				!lines.every((line) =>
					symbols.some((sym) => line.startsWith(`${sym} `)),
				)
			)
				continue

			const replacement = []

			const listOpen = new Token("bullet_list_open", "ul", 1)
			listOpen.attrSet("class", name)
			replacement.push(listOpen)

			for (const line of lines) {
				const itemOpen = new Token("list_item_open", "li", 1)
				const className = Object.entries(bulletClasses).find(([symbol]) =>
					line.startsWith(`${symbol} `),
				)?.[1]
				if (className) {
					itemOpen.attrSet("class", className)
				}
				replacement.push(itemOpen)

				const inline = new Token("inline", "", 0)
				inline.content = line.slice(3)
				inline.children = []
				replacement.push(inline)

				replacement.push(new Token("list_item_close", "li", -1))
			}

			replacement.push(new Token("bullet_list_close", "ul", -1))

			// paragraph_open is at i-1, inline at i, paragraph_close at i+1
			tokens.splice(i - 1, 3, ...replacement)
			i = i - 1 + replacement.length - 1
		}
	}

md.core.ruler.before(
	"inline",
	"question-list",
	createSpecialList("question-list", ["?-"]),
)
md.core.ruler.before(
	"inline",
	"exclaim-list",
	createSpecialList("exclaim-list", ["!-"]),
)
md.core.ruler.before(
	"inline",
	"commendation-list",
	createSpecialList("commendation-list", ["++", "--"], {
		"++": "commendations",
		"--": "demerits",
	}),
)

const STANDARD_CHAOS_POWERS = new Set([
	"Distort",
	"Corrupt",
	"Reality Trigger",
	"Manifest",
	"Attract",
	"Expand",
	"Double",
	"Displace",
	"Triple",
	"Kill",
	"Overwhelm",
])

md.core.ruler.before("inline", "chaos-table", (state) => {
	const { tokens } = state

	for (let i = 0; i < tokens.length; i++) {
		if (tokens[i].type !== "table_open") continue

		// Check if the first header cell is "Chaos"
		let firstHeader = ""
		for (let j = i + 1; j < tokens.length; j++) {
			if (tokens[j].type === "table_close") break
			if (tokens[j].type === "inline") {
				firstHeader = tokens[j].content.trim()
				break
			}
		}
		if (firstHeader !== "Chaos") continue

		tokens[i].attrSet("class", "chaos-table")

		// Tag body rows whose second cell isn't a standard power
		let inTbody = false
		let trStart = -1
		let tdCount = 0
		let secondCell = ""

		for (let j = i + 1; j < tokens.length; j++) {
			const type = tokens[j].type
			if (type === "table_close") break
			if (type === "tbody_open") {
				inTbody = true
				continue
			}
			if (type === "tbody_close") {
				inTbody = false
				continue
			}
			if (!inTbody) continue

			if (type === "tr_open") {
				trStart = j
				tdCount = 0
				secondCell = ""
			}
			if (type === "td_open") {
				tdCount++
			}
			if (type === "inline" && tdCount === 2) {
				secondCell = tokens[j].content.trim()
			}
			if (
				type === "tr_close" &&
				secondCell &&
				!STANDARD_CHAOS_POWERS.has(secondCell)
			) {
				tokens[trStart].attrSet("class", "new-effect")
			}
		}
	}
})

const defaultTableOpen =
	md.renderer.rules.table_open ??
	((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
	const tag = defaultTableOpen(tokens, idx, options, env, self)
	return tokens[idx].attrGet("class") === "chaos-table"
		? `${tag}<caption><i>▲</i> Introduced in this mission</caption>\n`
		: tag
}

export function renderToPages(
	content: string,
	imageMap: Map<string, string>,
): string {
	currentImageMap = imageMap
	const html = md.render(content)
	const parts = html.split('<div class="page-break"></div>\n')
	return parts
		.map((part) => `<section class="page">${part}</section>`)
		.join("\n")
}

export function extractImageKeys(content: string): Set<string> {
	const keys = new Set<string>()
	const regex = /\(image:([^)\s]+)\)/g
	let match = regex.exec(content)
	while (match !== null) {
		keys.add(match[1])
		match = regex.exec(content)
	}
	return keys
}
