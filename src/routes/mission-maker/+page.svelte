<script lang="ts">
	import { onMount } from "svelte"
	import { PageMeta } from "$lib/PageMeta"
	import { Markdown } from "./Markdown/index.ts"
	import { DEFAULT_META, Metadata, MetadataDrawer } from "./Metadata"
	import { MissionDocument } from "./Mission/index.ts"
	import { TemplateMission } from "./Mission/TemplateMission.ts"
	import {
		deleteImage,
		getAllImageKeys,
		loadDocument,
		loadImage,
		saveDocument,
		saveImage,
	} from "./storage.ts"
	import { ToolButton, Toolbar } from "./Toolbar"

	let editorContent = $state("")
	let metadata = $state<Metadata>({ ...DEFAULT_META })
	let imageMap = $state(new Map<string, string>())
	let previewOnly = $state(false)
	let loaded = $state(false)

	let textarea: HTMLTextAreaElement | undefined = $state()
	let dialog: HTMLDialogElement | undefined = $state()

	onMount(async () => {
		const stored = await loadDocument()
		if (stored) {
			const { metadata: loadedMeta, content } = Metadata.parse(stored)
			metadata = loadedMeta
			editorContent = content
		} else {
			const { metadata: loadedMeta, content } = Metadata.parse(
				TemplateMission(),
			)
			metadata = loadedMeta
			editorContent = content
		}
		imageMap = await resolveImages(Markdown.extractImageKeys(editorContent))
		loaded = true
	})

	// Debounced save to IndexedDB whenever content or metadata changes
	$effect(() => {
		if (!loaded) return
		const snapshot: Metadata = {
			...metadata,
		}
		const content = editorContent
		const timer = setTimeout(() => {
			saveDocument(Metadata.serialize(snapshot, content))
		}, 500)
		return () => clearTimeout(timer)
	})

	// Sync image map and purge orphaned images when content changes
	$effect(() => {
		if (!loaded) return
		const content = editorContent
		const timer = setTimeout(async () => {
			const keys = Markdown.extractImageKeys(content)
			await purgeOrphanedImages(keys)
			imageMap = await resolveImages(keys)
		}, 200)
		return () => clearTimeout(timer)
	})

	async function resolveImages(
		keys: Set<string>,
	): Promise<Map<string, string>> {
		const map = new Map<string, string>()
		for (const key of keys) {
			const data = await loadImage(key)
			if (data) map.set(key, data)
		}
		return map
	}

	async function purgeOrphanedImages(currentKeys: Set<string>): Promise<void> {
		const allKeys = await getAllImageKeys()
		for (const key of allKeys) {
			if (!currentKeys.has(key)) {
				await deleteImage(key)
			}
		}
	}

	async function handlePaste(e: ClipboardEvent) {
		const items = e.clipboardData?.items
		if (!items) return
		for (const item of Array.from(items)) {
			if (item.type.startsWith("image/")) {
				e.preventDefault()
				const file = item.getAsFile()
				if (!file) return
				const start = textarea?.selectionStart ?? editorContent.length
				const end = textarea?.selectionEnd ?? start
				const reader = new FileReader()
				reader.onload = async () => {
					const dataUrl = reader.result as string
					const key = crypto.randomUUID()
					await saveImage(key, dataUrl)
					const ref = `![pasted image](image:${key})`
					editorContent =
						editorContent.slice(0, start) + ref + editorContent.slice(end)
				}
				reader.readAsDataURL(file)
				return
			}
		}
	}

	function togglePreview() {
		previewOnly = !previewOnly
	}

	function toggleMetadata() {
		dialog?.showModal()
	}

	function printPreview() {
		window.print()
	}
</script>

<PageMeta
	title="Mission Maker"
	description="Create missions and documents for the tabletop game, Triangle Agency"
/>

<main class="app">
	<Toolbar>
		<ToolButton onclick={togglePreview}>
			{previewOnly ? "Show Editor" : "Preview Only"}
		</ToolButton>
		<ToolButton onclick={printPreview}>Print/PDF</ToolButton>
		<ToolButton onclick={toggleMetadata}>Edit Metadata</ToolButton>
	</Toolbar>

	<div class="workspace" class:preview-only={previewOnly}>
		<div class="preview-panel">
			<MissionDocument {metadata} content={editorContent} images={imageMap} />
		</div>

		<div class="editor-panel">
			<label for="editor-textarea" class="visually-hidden">Editor</label>
			<textarea
				id="editor-textarea"
				bind:this={textarea}
				bind:value={editorContent}
				onpaste={handlePaste}
				spellcheck={false}
				placeholder="Write your mission in markdown...&#10;&#10;Use --- to create a new page."
			></textarea>
		</div>
	</div>

	<MetadataDrawer bind:dialog bind:metadata />
</main>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		background: var(--bg);
	}

	.workspace {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.preview-panel {
		flex: 1;
		overflow: auto;
		background: oklch(0.85 0 0);
	}

	.editor-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.editor-panel textarea {
		flex: 1;
		resize: none;
		border: none;
		outline: none;
		padding: 1.25em;
		font-family:
			"Cascadia Code", "JetBrains Mono", "Fira Code", ui-monospace, monospace;
		font-size: 0.875em;
		line-height: 1.65;
		background: var(--agency-gray);
		color: var(--text);
		inline-size: 100%;
	}

	.workspace.preview-only .editor-panel {
		display: none;
	}

	@media (max-width: 50rem) {
		.preview-panel {
			display: none;
		}

		.editor-panel {
			border-left: none;
		}
	}

	@media (max-width: 50rem) {
		.workspace.preview-only .preview-panel {
			display: flex;
			flex: 1;
		}

		.workspace.preview-only .editor-panel {
			display: none;
		}
	}

	@media print {
		.editor-panel {
			display: none;
		}

		.app {
			height: auto;
			overflow: visible;
		}

		.workspace {
			display: block;
			overflow: visible;
		}

		.preview-panel {
			display: block;
			overflow: visible;
			background: none;
		}
	}

	@page {
		size: letter;
		margin: 0;
	}
</style>
