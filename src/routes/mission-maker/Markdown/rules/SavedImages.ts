import type MarkdownIt from "markdown-it"
import type { RenderRule } from "markdown-it/lib/renderer.mjs"
import type { ImageMap } from "../ImageMap"

/**
 * Images in general come from the database.
 */
export function SavedImages(imageMap: ImageMap, mdIt: MarkdownIt): RenderRule {
	const defaultImageRenderer = mdIt.renderer.rules.image
	if (defaultImageRenderer == null) {
		throw new Error("No image renderer found?")
	}

	return (tokens, idx, options, env, self) => {
		const token = tokens[idx]
		const src = token.attrGet("src") ?? ""

		if (src.startsWith("image:")) {
			const key = src.slice(6)
			const dataUrl = imageMap.get(key) ?? ""
			const alt = self.renderInlineAsText(token.children ?? [], options, env)
			return `<img src="${mdIt.utils.escapeHtml(dataUrl)}" alt="${mdIt.utils.escapeHtml(alt)}">`
		}

		return defaultImageRenderer(tokens, idx, options, env, self)
	}
}
