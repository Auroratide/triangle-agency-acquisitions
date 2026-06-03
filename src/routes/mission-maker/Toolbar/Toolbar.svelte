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
		<span class="tool-name">Mission Maker</span>
		<span class="divider">▲</span>
		<span class="site-title"><a href="/">Triangle Agency Acquisitions</a></span>
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

	@media print {
		.toolbar {
			display: none;
		}
	}
</style>
