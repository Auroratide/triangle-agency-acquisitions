<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		variant = "ink",
		children,
		onclick,
	}: {
		variant?: "gray" | "ink" | "yellow"
		children?: Snippet
		onclick?: () => void
	} = $props()
</script>

<button type="button" class="{variant}" {onclick}>
	{@render children?.()}
</button>

<style>
	button {
		padding: 0.35em 0.8em;
		background: transparent;
		border: 0.125em solid currentcolor;
		border-radius: 0.5em;
		font-size: 0.92em;
		cursor: pointer;
	}

	button.gray {
		color: var(--agency-gray);
	}

	button.ink {
		color: var(--agency-ink);
	}

	button.yellow {
		color: var(--reality-yellow);
	}

	button.gray:hover,
	button.gray:focus-visible {
		color: var(--reality-yellow);
	}

	button.ink:hover,
	button.ink:focus-visible {
		color: var(--agency-red);
	}

	button.yellow:hover,
	button.yellow:focus-visible {
		color: var(--agency-gray);
	}

	button:active {
		filter: brightness(1.25);
	}
</style>
