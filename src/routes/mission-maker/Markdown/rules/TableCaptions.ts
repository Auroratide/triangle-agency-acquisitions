import type MarkdownIt from "markdown-it"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"

/**
 * If a custom table is defined, a separate rule is needed to add a caption to it.
 * @param caption { "my-table": "My caption" }
 */
export function TableCaptions(
	md: MarkdownIt,
	caption: Record<string, string>,
): RenderRule {
	const defaultTableOpen =
		md.renderer.rules.table_open ??
		((tokens, idx, options, _env, self) =>
			self.renderToken(tokens, idx, options))

	return (tokens, idx, options, env, self) => {
		const tag = defaultTableOpen(tokens, idx, options, env, self)

		const hasCaption = Object.entries(caption).find(
			([className]) => tokens[idx].attrGet("class") === className,
		)

		return hasCaption ? `${tag}<caption>${hasCaption[1]}</caption>\n` : tag
	}
}
