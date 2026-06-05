<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		variant = "ink",
		children,
		onclick,
		disabled = false,
		size = "auto",
	}: {
		variant?: "gray" | "ink" | "yellow" | "blue"
		children?: Snippet
		onclick?: () => void
		disabled?: boolean
		size?: "auto" | "full"
	} = $props()
</script>

<button type="button" class="{variant} {size}" {onclick} {disabled}>
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

	button.blue {
		color: var(--anomaly-blue);
	}

	button.gray:hover:not(:disabled),
	button.gray:focus-visible {
		color: var(--reality-yellow);
	}

	button.ink:hover:not(:disabled),
	button.ink:focus-visible {
		color: var(--agency-red);
	}

	button.yellow:hover:not(:disabled),
	button.yellow:focus-visible {
		color: var(--agency-gray);
	}

	button.blue:hover:not(:disabled),
	button.blue:focus-visible {
		color: var(--agency-ink);
	}

	button:active {
		filter: brightness(1.25);
	}

	button:disabled {
		opacity: 0.75;
		cursor: not-allowed;
	}

	button.full {
		inline-size: 100%;
	}
</style>
