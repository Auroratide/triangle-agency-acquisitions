import type { Token } from "markdown-it/index.js"
import type { RuleCore } from "markdown-it/lib/parser_core.mjs"

export function TableLineBreaks(): RuleCore {
	return (state) => {
		const { tokens, Token } = state
		let inCell = false

		for (const token of tokens) {
			if (token.type === "td_open" || token.type === "th_open") {
				inCell = true
				continue
			}
			if (token.type === "td_close" || token.type === "th_close") {
				inCell = false
				continue
			}
			if (!inCell || token.type !== "inline" || !token.children) continue

			const updated: Token[] = []
			for (const child of token.children) {
				if (child.type !== "text" || !child.content.includes("///")) {
					updated.push(child)
					continue
				}
				const parts = child.content.split("///")
				for (let i = 0; i < parts.length; i++) {
					if (i > 0) {
						const br = new Token("html_inline", "", 0)
						br.content = '<br><span class="space"></span>'
						updated.push(br)
					}
					if (parts[i].length > 0) {
						const t = new Token("text", "", 0)
						t.content = parts[i]
						updated.push(t)
					}
				}
			}
			token.children = updated
		}
	}
}
