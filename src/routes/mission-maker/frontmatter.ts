export interface DocumentMeta {
	title: string
	subtitle: string
	primaryColor: string
	secondaryColor: string
}

export const DEFAULT_META: DocumentMeta = {
	title: "",
	subtitle: "",
	primaryColor: "#cc0000",
	secondaryColor: "#1a1a4e",
}

export function parseFrontmatter(raw: string): {
	meta: DocumentMeta
	content: string
} {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
	if (!match) {
		return { meta: { ...DEFAULT_META }, content: raw }
	}

	const meta = { ...DEFAULT_META }
	for (const line of match[1].split("\n")) {
		const colonIdx = line.indexOf(":")
		if (colonIdx < 0) continue
		const key = line.slice(0, colonIdx).trim() as keyof DocumentMeta
		const value = line.slice(colonIdx + 1).trim()
		if (key in meta) {
			;(meta as Record<string, string>)[key] = value
		}
	}

	return { meta, content: match[2] }
}

export function serializeFrontmatter(
	meta: DocumentMeta,
	content: string,
): string {
	const lines = (Object.keys(meta) as (keyof DocumentMeta)[])
		.map((k) => `${k}: ${meta[k]}`)
		.join("\n")
	return `---\n${lines}\n---\n${content}`
}
