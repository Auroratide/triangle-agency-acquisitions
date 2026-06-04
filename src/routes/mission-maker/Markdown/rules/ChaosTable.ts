import type { StateCore } from "markdown-it/index.js"

/*
 * Sonnet 4.6
 * I want to define a special table. Consider the following syntax which is used to define tables in markdown. I want to make it so that if the table's first cell is "Chaos", then the table gets the class "chaos-table". The second thing is more complicated, so let me know whether it is doable in the markdown-it extension mechanism. The second  column in some rows is the title of a chaos power. These names are  standardized for the most part ("Corrupt", "Manifest", "Expand", and others are all considered standard). Some names are custom (such as "Echo"). I want  to define a list of standard words, and if the second cell in a row is NOT one of the standard words, then the whole row gets a class "new-effect". Here is the table:
  | Chaos | Name    | Effect   |
  | ----- | ------- | -------- |
  | 2     | Corrupt | This is a bunch of text? But what if |
  | 2     | Echo | This is a new ability |
  | 4     | Manifest | Some more text. <br /> Some other text. |
 */

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
