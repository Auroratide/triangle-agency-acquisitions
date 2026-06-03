import * as matter from "gray-matter-es"

export type Metadata = {
	title: string
	subtitle: string
	updated: Date
	author: string
	artist: string
	contentWarnings: string
	primaryColor: string
	secondaryColor: string
}

export const DEFAULT_META: Metadata = {
	title: "",
	subtitle: "",
	updated: new Date(),
	author: "",
	artist: "",
	contentWarnings: "",
	primaryColor: "#d10017",
	secondaryColor: "#10045a",
}

export const Metadata = {
	parse(raw: string): {
		metadata: Metadata
		content: string
	} {
		const result = matter.matter(raw)

		return {
			content: result.content,
			metadata: {
				...DEFAULT_META,
				...result.data,
			},
		}
	},
	serialize(metadata: Metadata, content: string): string {
		return matter.stringify(content, metadata)
	},
} as const
