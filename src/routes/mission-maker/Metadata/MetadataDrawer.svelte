<script lang="ts">
	import { Button } from "$lib/Button"
	import { DrawerDialog } from "$lib/DrawerDialog"
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
</script>

<DrawerDialog bind:dialog id="metadata-drawer" title="Metadata">
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
	{#snippet footer()}
		<Button onclick={close}>Save & Close</Button>
	{/snippet}
</DrawerDialog>

<style>
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
</style>
