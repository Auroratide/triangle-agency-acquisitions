import MarkdownIt from "markdown-it"

let currentImageMap: Map<string, string> = new Map()

const md = new MarkdownIt({
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
