import { type DBSchema, type IDBPDatabase, openDB } from "idb"

interface MissionMakerDB extends DBSchema {
	documents: {
		key: string
		value: string
	}
	images: {
		key: string
		value: string
	}
}

const DB_NAME = "mission-maker"
const DB_VERSION = 1

let dbPromise: Promise<IDBPDatabase<MissionMakerDB>> | null = null

function getDB(): Promise<IDBPDatabase<MissionMakerDB>> {
	dbPromise ??= openDB<MissionMakerDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			if (!db.objectStoreNames.contains("documents")) {
				db.createObjectStore("documents")
			}
			if (!db.objectStoreNames.contains("images")) {
				db.createObjectStore("images")
			}
		},
	})
	return dbPromise
}

export async function loadDocument(): Promise<string | undefined> {
	return (await getDB()).get("documents", "current")
}

export async function saveDocument(content: string): Promise<void> {
	await (await getDB()).put("documents", content, "current")
}

export async function saveImage(key: string, dataUrl: string): Promise<void> {
	await (await getDB()).put("images", dataUrl, key)
}

export async function loadImage(key: string): Promise<string | undefined> {
	return (await getDB()).get("images", key)
}

export async function deleteImage(key: string): Promise<void> {
	await (await getDB()).delete("images", key)
}

export async function getAllImageKeys(): Promise<string[]> {
	return (await getDB()).getAllKeys("images")
}
