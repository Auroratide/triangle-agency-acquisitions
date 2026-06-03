<script lang="ts">
	import { Button } from "$lib/Button"
	import type { Metadata } from "./Metadata"

	let {
		metadata = $bindable(),
		dialog = $bindable(),
	}: {
		metadata: Metadata
		dialog: HTMLDialogElement | undefined
	} = $props()

	function close() {
		dialog?.close()
	}

	function onDialogClick(e: Event) {
		if (e.target === dialog) {
			dialog.close()
		}
	}
</script>

<dialog
	bind:this={dialog}
	onclick={onDialogClick}
	id="metadata-drawer"
	class="metadata-drawer"
>
	<header>
		<h2>Metadata</h2>
		<button
			type="button"
			class="close-button"
			aria-label="Close Metadata Drawer"
			onclick={close}
		>
			✕
		</button>
	</header>
	<section class="fields">
		<div class="control">
			<label for="metadata-title">Title</label>
			<input
				id="metadata-title"
				type="text"
				bind:value={metadata.title}
				placeholder="Mission Title"
			>
		</div>
		<div class="control">
			<label for="metadata-subtitle">Subtitle</label>
			<input
				id="metadata-subtitle"
				type="text"
				bind:value={metadata.subtitle}
				placeholder="Mission Subtitle"
			>
		</div>
		<div class="control">
			<label for="metadata-author">Author</label>
			<input
				id="metadata-author"
				type="text"
				bind:value={metadata.author}
				placeholder="Author Name"
			>
		</div>
		<div class="control">
			<label for="metadata-artist">Artist</label>
			<input
				id="metadata-artist"
				type="text"
				bind:value={metadata.artist}
				placeholder="Artist Name(s)"
			>
		</div>
		<div class="control">
			<label for="metadata-content-warnings">Content Warnings</label>
			<input
				id="metadata-content-warnings"
				type="text"
				bind:value={metadata.contentWarnings}
				placeholder="e.g. gore, spiders"
			>
		</div>
		<div class="control">
			<label for="metadata-primary-color">Primary Color</label>
			<div class="color-row">
				<input
					id="metadata-primary-color"
					type="color"
					bind:value={metadata.primaryColor}
				>
				<label for="metadata-primary-color-hex" class="visually-hidden"
					>Primary Color Hex</label
				>
				<input
					id="metadata-primary-color-hex"
					type="text"
					bind:value={metadata.primaryColor}
				>
			</div>
		</div>
		<div class="control">
			<label for="metadata-secondary-color">Secondary Color</label>
			<div class="color-row">
				<input
					id="metadata-secondary-color"
					type="color"
					bind:value={metadata.secondaryColor}
				>
				<label for="metadata-secondary-color-hex" class="visually-hidden"
					>Secondary Color Hex</label
				>
				<input
					id="metadata-secondary-color-hex"
					type="text"
					bind:value={metadata.secondaryColor}
				>
			</div>
		</div>
	</section>
	<footer>
		<Button onclick={close}>Save & Close</Button>
	</footer>
</dialog>

<style>
	.metadata-drawer {
		position: fixed;
		inset: 0 -26rem auto auto;
		inline-size: 25rem;
		max-inline-size: 100%;
		block-size: 100vh;
		max-block-size: none;
		background: var(--bg);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		transition: inset-inline-end 0.22s ease;
		border: none;
		margin: 0;
		padding: 0;
		box-shadow: -0.125em 0 1em oklch(0 0 0 / 0.2);
	}

	.metadata-drawer::backdrop {
		background: oklch(0 0 0 / 0.333);
	}

	.metadata-drawer[open] {
		inset-inline-end: 0;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--agency-gray);
		padding: 1em;
	}

	h2 {
		margin: 0;
		font-size: 1em;
		font-weight: bold;
		text-transform: uppercase;
		color: var(--agency-ink);
	}

	.close-button {
		background: none;
		border: none;
		font-size: 1em;
		padding: 0.25em 0.6em;
		font-weight: bold;
	}

	.close-button:hover {
		background: var(--reality-yellow);
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		flex: 1;
	}

	.control {
		display: flex;
		flex-direction: column;
		gap: 0.125em;
	}

	input[type="text"] {
		padding: 0.375em 0.625em;
		border: 0.125em solid var(--agency-ink);
		font-size: 1em;
		flex: 1;
	}

	input[type="color"] {
		border: 0.125em solid var(--agency-ink);
		width: 2.4em;
		height: 2.4em;
		font-size: 1em;
	}

	.color-row {
		display: flex;
		gap: 0.375em;
	}

	footer {
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	@media print {
		.metadata-drawer {
			display: none;
		}
	}
</style>
