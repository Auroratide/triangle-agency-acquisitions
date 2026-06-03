<script lang="ts">
	let {
		title,
		href,
		description,
	}: {
		title: string
		href: string
		description: string
	} = $props()
</script>

<article class="tool-card">
	<p class="title"><a href="{href}">{title}</a></p>
	<p class="description">{description}</p>
</article>

<style>
	.tool-card {
		--color: var(--agency-ink);
		border: 0.25em solid var(--color);
		border-radius: 1.5em;
		overflow: hidden;
		background: var(--bg);
		inline-size: 100%;
		position: relative;
		margin: 0 0 1.5em 0;
		transition:
			border-color 0.125s ease-in-out,
			transform 0.125s ease-in-out,
			box-shadow 0.125s ease-in-out;
	}

	.tool-card:hover,
	.tool-card:focus-within {
		--color: var(--anomaly-blue);
		transform: scale(1.025);
		box-shadow: 0 0.125em 0.5em 0.25em oklch(0 0 0 / 0.25);
	}

	p {
		margin: 0;
		padding: 1em;
	}

	.title {
		background: var(--color);
		padding: 0.25em 0.75em;
		margin: 0;
		font-size: 1.375em;
		font-weight: bold;
		transition: background-color 0.125s ease-in-out;
	}

	.title a {
		color: var(--bg);
		text-decoration: none;
	}

	a::before {
		content: "";
		position: absolute;
		inset: 0;
	}
</style>
