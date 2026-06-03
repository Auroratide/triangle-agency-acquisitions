import type { StateCore } from "markdown-it/index.js"

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

/**
 * Represents a table of chaos effects. This smartly handles whether the ability
 * specified is unique to the mission or not.
 */
export function ChaosTable() {
	return (state: StateCore) => {
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
	}
}
