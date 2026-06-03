import type { StateCore } from "markdown-it/index.js"

/**
 * Creates a rule for a list defined by a custom list of symbols. For instance, this lets you create a list like this:
 * ?- Point 1
 * ?- Point 2
 * ?- Point 3
 *
 * @param name class name for the list
 * @param symbols symbols that denote the list
 * @param bulletClasses if bullets should have classes, assign them here, e.g. { "--": "demerit" }
 */
export function CustomList(
	name: string,
	symbols: string[],
	bulletClasses: Record<string, string> = {},
) {
	return (state: StateCore) => {
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
}
