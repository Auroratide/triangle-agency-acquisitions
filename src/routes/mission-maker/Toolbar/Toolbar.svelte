<script lang="ts">
	import type { Snippet } from "svelte"

	let {
		children,
	}: {
		children?: Snippet
	} = $props()
</script>

<header class="toolbar">
	<nav>
		<h1 class="tool-name">Mission Maker</h1>
		<span class="divider">▲</span>
		<span class="site-title"
			><a href="/">
				<span class="large-screens">Triangle Agency Acquisitions</span>
				<span class="small-screens">Home</span>
			</a></span
		>
	</nav>
	<menu>
		{@render children?.()}
	</menu>
</header>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 1em;
		background: var(--agency-ink);
		color: var(--bg);
	}

	.tool-name {
		font-size: 1em;
	}

	nav {
		text-transform: uppercase;
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	nav a {
		color: var(--agency-gray);
	}

	.divider {
		font-size: 0.5em;
	}

	menu {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 0.5em;
		margin: 0;
	}

	.small-screens {
		display: none;
	}

	@media (max-width: 50rem) {
		.toolbar {
			flex-direction: column;
			justify-content: center;
			gap: 0.5em;
		}

		.small-screens {
			display: inline;
		}

		.large-screens {
			display: none;
		}

		menu {
			font-size: 0.875em;
		}
	}

	@media print {
		.toolbar {
			display: none;
		}
	}
</style>
