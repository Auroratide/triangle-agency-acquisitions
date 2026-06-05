<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		id,
		dialog = $bindable(),
		title,
		children,
		footer,
	}: {
		id: string
		dialog: HTMLDialogElement | undefined
		title: string
		children?: Snippet
		footer?: Snippet
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
	{id}
	bind:this={dialog}
	onpointerdown={onDialogClick}
	class="drawer-dialog"
>
	<header>
		<h2>{title}</h2>
		<button
			type="button"
			class="close-button"
			aria-label="Close Drawer"
			onclick={close}
		>
			✕
		</button>
	</header>
	<section class="content">
		{@render children?.()}
	</section>
	{#if footer}
		<footer>
			{@render footer()}
		</footer>
	{/if}
</dialog>

<style>
	.drawer-dialog {
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

	.drawer-dialog::backdrop {
		background: oklch(0 0 0 / 0.333);
	}

	.drawer-dialog[open] {
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

	.content {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		flex: 1;
	}

	footer {
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	@media print {
		.drawer-dialog {
			display: none;
		}
	}
</style>
