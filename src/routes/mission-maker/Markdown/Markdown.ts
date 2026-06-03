import MarkdownIt from "markdown-it"
import type { ImageMap } from "./ImageMap"
import { ChaosTable } from "./rules/ChaosTable"
import { CustomList } from "./rules/CustomList"
import { PageBreak } from "./rules/PageBreak"
import { SavedImages } from "./rules/SavedImages"
import { TableCaptions } from "./rules/TableCaptions"

let currentImageMap: ImageMap = new Map()

const md = new MarkdownIt({
	html: true,
	breaks: true,
	linkify: true,
})

md.renderer.rules.hr = PageBreak()
md.renderer.rules.image = SavedImages(currentImageMap, md)

md.core.ruler.before(
	"inline",
	"question-list",
	CustomList("question-list", ["?-"]),
)
md.core.ruler.before(
	"inline",
	"exclaim-list",
	CustomList("exclaim-list", ["!-"]),
)
md.core.ruler.before(
	"inline",
	"commendation-list",
	CustomList("commendation-list", ["++", "--"], {
		"++": "commendations",
		"--": "demerits",
	}),
)

md.core.ruler.before("inline", "chaos-table", ChaosTable())
md.renderer.rules.table_open = TableCaptions(md, {
	"chaos-table": "<i>▲</i> Introduced in this mission",
})

export const Markdown = {
	renderToPages(content: string, images: ImageMap): string {
		currentImageMap = images
		const html = md.render(content)
		const parts = html.split('<div class="page-break"></div>\n')
		return parts
			.map((part) => `<section class="page">${part}</section>`)
			.join("\n")
	},
	extractImageKeys(content: string): Set<string> {
		const keys = new Set<string>()
		const regex = /\(image:([^)\s]+)\)/g
		let match = regex.exec(content)
		while (match !== null) {
			keys.add(match[1])
			match = regex.exec(content)
		}
		return keys
	},
} as const
