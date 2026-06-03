<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		children,
		onclick,
	}: {
		children?: Snippet
		onclick?: () => void
	} = $props()
</script>

<li><button type="button" {onclick}>{@render children?.()}</button></li>

<style>
	button {
		padding: 0.35em 0.8em;
		background: transparent;
		color: var(--bg);
		border: 0.125em solid currentcolor;
		border-radius: 0.5em;
		font-size: 0.92em;
		cursor: pointer;
	}

	button:hover,
	button:focus-visible {
		color: var(--reality-yellow);
	}

	button:active {
		filter: brightness(1.25);
	}
</style>
