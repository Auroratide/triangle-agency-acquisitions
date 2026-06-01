<script module>
	export const ssr = false
</script>

<script lang="ts">
	import { onMount } from "svelte"
	import {
		DEFAULT_META,
		type DocumentMeta,
		parseFrontmatter,
		serializeFrontmatter,
	} from "./frontmatter.ts"
	import { MissionDocument } from "./Mission/index.ts"
	import { extractImageKeys } from "./markdown.ts"
	import {
		deleteImage,
		getAllImageKeys,
		loadDocument,
		loadImage,
		saveDocument,
		saveImage,
	} from "./storage.ts"

	let editorContent = $state("")
	let meta = $state<DocumentMeta>({ ...DEFAULT_META })
	let imageMap = $state(new Map<string, string>())
	let previewOnly = $state(false)
	let showMetadata = $state(false)
	let loaded = $state(false)

	let textarea: HTMLTextAreaElement | undefined = $state()

	onMount(async () => {
		const stored = await loadDocument()
		if (stored) {
			const { meta: loadedMeta, content } = parseFrontmatter(stored)
			meta = loadedMeta
			editorContent = content
		}
		imageMap = await resolveImages(extractImageKeys(editorContent))
		loaded = true
	})

	// Debounced save to IndexedDB whenever content or metadata changes
	$effect(() => {
		if (!loaded) return
		const snapshot: DocumentMeta = {
			title: meta.title,
			subtitle: meta.subtitle,
			primaryColor: meta.primaryColor,
			secondaryColor: meta.secondaryColor,
		}
		const content = editorContent
		const timer = setTimeout(() => {
			saveDocument(serializeFrontmatter(snapshot, content))
		}, 500)
		return () => clearTimeout(timer)
	})

	// Sync image map and purge orphaned images when content changes
	$effect(() => {
		if (!loaded) return
		const content = editorContent
		const timer = setTimeout(async () => {
			const keys = extractImageKeys(content)
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
</script>

<svelte:head>
	<title>Mission Maker | Triangle Agency</title>
</svelte:head>

<div class="app">
	<div class="toolbar">
		<span class="app-title">Mission Maker</span>
		<div class="toolbar-actions">
			<button type="button" onclick={() => (previewOnly = !previewOnly)}>
				{previewOnly ? "Show Editor" : "Preview Only"}
			</button>
			<button
				type="button"
				onclick={() => (showMetadata = !showMetadata)}
				class:active={showMetadata}
			>
				Metadata
			</button>
		</div>
	</div>

	<div class="workspace" class:preview-only={previewOnly}>
		<div class="preview-panel">
			<MissionDocument
				theme={{
				primary: meta.primaryColor,
				secondary: meta.secondaryColor,
			}}
				content={editorContent}
				images={imageMap}
			/>
		</div>

		<div class="editor-panel">
			<textarea
				bind:this={textarea}
				bind:value={editorContent}
				onpaste={handlePaste}
				spellcheck={false}
				placeholder="Write your mission in markdown...&#10;&#10;Use --- to create a new page."
			></textarea>
		</div>
	</div>

	{#if showMetadata}
		<div
			class="metadata-overlay"
			role="button"
			tabindex="-1"
			aria-label="Close metadata panel"
			onclick={() => (showMetadata = false)}
			onkeydown={(e) => {
				if (e.key === "Escape") {
					showMetadata = false	
				}
			}}
		></div>
	{/if}

	<aside
		class="metadata-drawer"
		class:open={showMetadata}
		aria-label="Document metadata"
	>
		<div class="metadata-header">
			<h2>Metadata</h2>
			<button
				type="button"
				onclick={() => (showMetadata = false)}
				aria-label="Close metadata panel"
			>
				✕
			</button>
		</div>
		<div class="metadata-fields">
			<label>
				<span>Title</span>
				<input type="text" bind:value={meta.title} placeholder="Mission title">
			</label>
			<label>
				<span>Subtitle</span>
				<input
					type="text"
					bind:value={meta.subtitle}
					placeholder="Mission subtitle"
				>
			</label>
			<label>
				<span>Primary Color</span>
				<div class="color-field">
					<input type="color" bind:value={meta.primaryColor}>
					<input type="text" bind:value={meta.primaryColor}>
				</div>
			</label>
			<label>
				<span>Secondary Color</span>
				<div class="color-field">
					<input type="color" bind:value={meta.secondaryColor}>
					<input type="text" bind:value={meta.secondaryColor}>
				</div>
			</label>
		</div>
	</aside>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		font-family: system-ui, sans-serif;
		background: #f0f0f0;
	}

	/* ── Toolbar ──────────────────────────────────── */

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		background: #1a1a2e;
		color: white;
		flex-shrink: 0;
		gap: 1rem;
		z-index: 10;
	}

	.app-title {
		font-weight: 600;
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.9;
	}

	.toolbar-actions {
		display: flex;
		gap: 0.5rem;
	}

	.toolbar button {
		padding: 0.35rem 0.8rem;
		background: rgba(255, 255, 255, 0.08);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.8rem;
		transition:
			background 0.15s,
			border-color 0.15s;
	}

	.toolbar button:hover {
		background: rgba(255, 255, 255, 0.18);
	}

	.toolbar button.active {
		background: rgba(255, 255, 255, 0.22);
		border-color: rgba(255, 255, 255, 0.5);
	}

	/* ── Workspace ────────────────────────────────── */

	.workspace {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	/* ── Preview panel ────────────────────────────── */

	.preview-panel {
		flex: 1;
		overflow: auto;
		background: #c8c8c8;
	}

	/* ── Editor panel ─────────────────────────────── */

	.editor-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		border-left: 1px solid #d0d0d0;
		overflow: hidden;
	}

	.editor-panel textarea {
		flex: 1;
		resize: none;
		border: none;
		outline: none;
		padding: 1.25rem;
		font-family:
			"Cascadia Code", "JetBrains Mono", "Fira Code", ui-monospace, monospace;
		font-size: 13px;
		line-height: 1.65;
		background: #fafafa;
		color: #2a2a2a;
		width: 100%;
		box-sizing: border-box;
	}

	/* ── Preview-only mode ────────────────────────── */

	.workspace.preview-only .editor-panel {
		display: none;
	}

	/* ── Mobile ───────────────────────────────────── */

	@media (max-width: 767px) {
		.preview-panel {
			display: none;
		}

		.editor-panel {
			border-left: none;
		}
	}

	@media (max-width: 767px) {
		.workspace.preview-only .preview-panel {
			display: flex;
			flex: 1;
		}

		.workspace.preview-only .editor-panel {
			display: none;
		}
	}

	/* ── Metadata drawer ──────────────────────────── */

	.metadata-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 50;
	}

	.metadata-drawer {
		position: fixed;
		top: 0;
		right: calc(-320px - 20px);
		width: 320px;
		height: 100vh;
		background: white;
		box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
		transition: right 0.22s ease;
		z-index: 100;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}

	.metadata-drawer.open {
		right: 0;
	}

	.metadata-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #eee;
		flex-shrink: 0;
	}

	.metadata-header h2 {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #444;
	}

	.metadata-header button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		padding: 0.25rem 0.4rem;
		color: #888;
		border-radius: 4px;
	}

	.metadata-header button:hover {
		background: #f0f0f0;
		color: #333;
	}

	.metadata-fields {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.metadata-fields label {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.metadata-fields span {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #888;
	}

	.metadata-fields input[type="text"] {
		padding: 0.45rem 0.6rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0.9rem;
		color: #2a2a2a;
		outline: none;
		transition: border-color 0.15s;
	}

	.metadata-fields input[type="text"]:focus {
		border-color: #888;
	}

	.color-field {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.color-field input[type="color"] {
		width: 2.4rem;
		height: 2.4rem;
		padding: 2px;
		border: 1px solid #ddd;
		border-radius: 4px;
		cursor: pointer;
		flex-shrink: 0;
		background: none;
	}

	.color-field input[type="text"] {
		flex: 1;
	}

	/* ── Print ────────────────────────────────────── */

	@media print {
		:global(body) {
			overflow: auto;
		}

		.toolbar,
		.editor-panel,
		.metadata-drawer,
		.metadata-overlay {
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

		:global(.preview-container .page) {
			zoom: 1;
			width: 100%;
			min-height: auto;
			padding: 0;
			box-shadow: none;
			margin: 0;
			break-after: page;
			page-break-after: always;
		}

		:global(.preview-container .page:last-child) {
			break-after: avoid;
			page-break-after: avoid;
		}
	}

	@page {
		size: letter;
		margin: 1in;
	}
</style>
