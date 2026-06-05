import { type DBSchema, openDB } from "idb"
import type { Id } from "./Id"
import { lazy } from "./lazy"

interface MissionMakerDB extends DBSchema {
	documents: {
		key: Id
		value: string
	}
	images: {
		key: string
		value: string
	}
	names: {
		key: Id
		value: string
	}
}

const DB_NAME = "mission-maker"
const DB_VERSION = 2

export type DocumentIdAndName = { id: Id; name: string }

export class MissionDatabase {
	private readonly db = lazy(() =>
		openDB<MissionMakerDB>(DB_NAME, DB_VERSION, {
			upgrade(db) {
				if (!db.objectStoreNames.contains("documents")) {
					db.createObjectStore("documents")
				}
				if (!db.objectStoreNames.contains("images")) {
					db.createObjectStore("images")
				}
				if (!db.objectStoreNames.contains("names")) {
					db.createObjectStore("names")
				}
			},
		}),
	)

	currentDocumentId(): Id {
		return localStorage.getItem("current-document-id") ?? "current"
	}

	async loadDocument(id: Id): Promise<string | undefined> {
		const document = (await this.db()).get("documents", id)
		localStorage.setItem("current-document-id", id)

		return document
	}

	async saveDocument(id: Id, name: string, content: string): Promise<void> {
		const db = await this.db()

		await db.put("documents", content, id)
		await db.put("names", name, id)

		localStorage.setItem("current-document-id", id)
	}

	async listDocuments(): Promise<DocumentIdAndName[]> {
		const db = await this.db()

		const [ids, names] = await Promise.all([
			db.getAllKeys("names"),
			db.getAll("names"),
		])

		return ids
			.map((id, i) => ({ id, name: names[i] }))
			.toSorted((a, b) => a.name.localeCompare(b.name))
	}

	async saveImage(key: Id, dataUrl: string): Promise<void> {
		await (await this.db()).put("images", dataUrl, key)
	}

	async loadImage(key: Id): Promise<string | undefined> {
		return (await this.db()).get("images", key)
	}

	async deleteImage(key: Id): Promise<void> {
		await (await this.db()).delete("images", key)
	}

	async getAllImageKeys(): Promise<string[]> {
		return (await this.db()).getAllKeys("images")
	}
}
