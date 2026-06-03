import type { RuleCore } from "markdown-it/lib/parser_core.mjs"

export function NumericCells(): RuleCore {
	return (state) => {
		const NUMERIC = /^[+-]?\d+(\s+@[a-z0-9][a-z0-9-]*@)?$/

		for (let i = 0; i < state.tokens.length; i++) {
			if (state.tokens[i].type !== "inline") continue

			const cell = state.tokens[i - 1]
			if (!cell || (cell.type !== "td_open" && cell.type !== "th_open"))
				continue

			if (!NUMERIC.test(state.tokens[i].content.trim())) continue

			const existing = cell.attrGet("class")
			cell.attrSet("class", existing ? `${existing} numeric` : "numeric")
		}
	}
}
