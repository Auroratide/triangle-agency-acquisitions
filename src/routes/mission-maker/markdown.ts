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
	(name: string, symbol: string) => (state: StateCore) => {
		const { Token, tokens } = state

		for (let i = 0; i < tokens.length; i++) {
			if (tokens[i].type !== "inline") continue

			const lines = tokens[i].content.split("\n")
			if (!lines.every((line) => line.startsWith(`${symbol} `))) continue

			const replacement = []

			const listOpen = new Token("bullet_list_open", "ul", 1)
			listOpen.attrSet("class", name)
			replacement.push(listOpen)

			for (const item of lines.map((l) => l.slice(3))) {
				replacement.push(new Token("list_item_open", "li", 1))
				const inline = new Token("inline", "", 0)
				inline.content = item
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
	createSpecialList("question-list", "?-"),
)
md.core.ruler.before(
	"inline",
	"exclaim-list",
	createSpecialList("exclaim-list", "!-"),
)

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
