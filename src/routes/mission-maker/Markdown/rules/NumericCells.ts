import type { RuleCore } from "markdown-it/lib/parser_core.mjs"

/*
 * Sonnet 4.6
 * Another custom rule. For tables, is it possible to make it so that if a cell contains only a number with or without an icon, then the cell gets a class `numeric`? The following are examples of valid cells: `5`, `0`, `+4`, `-12`, `8 @chaos@`, `+5 @anomaly@`, etc.
 */

/**
 * A special rule that marks certain cells in tables as being "numeric",
 * which makes them large.
 *
 * Note: This might be the wrong abstraction. "Large Cells" in general
 * might be a better approach in the future.
 */
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
