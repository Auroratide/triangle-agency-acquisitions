<script lang="ts">
	import type { MissionMetadata } from "./MissionMetadata"

	let {
		metadata,
	}: {
		metadata: MissionMetadata
	} = $props()
</script>

<section class="page title-page">
	<div class="background"></div>
	<div class="content">
		<h1>{metadata.title}</h1>
		<hr>
		<p class="byline">By: {metadata.author}</p>
	</div>
</section>

<style>
	.title-page {
		position: relative;
		color: var(--bg);
	}

	.title-page.page::before,
	.title-page.page::after {
		display: none;
	}

	.title-page h1 {
		font-size: 76pt;
		font-weight: bold;
		text-transform: uppercase;
		margin: 0;
		line-height: 0.875;
		letter-spacing: -0.0625ch;
	}

	.title-page hr {
		border: none;
		background: none;
		border-block-start: 0.125in solid var(--bg);
	}

	.title-page .byline {
		font-size: 32pt;
		font-weight: bold;
		text-transform: uppercase;
		margin: 8pt 0;
		line-height: 1;
		letter-spacing: -0.0625ch;
	}

	.title-page .background {
		position: absolute;
		inset: 0;
		background: var(--primary-color);
		clip-path: polygon(0 40%, 25% 5%, 95% 100%, 0 100%);
		z-index: 1;
	}

	.title-page .content {
		position: absolute;
		inset: auto 0 0.75in 0.75in;
		z-index: 2;
	}
</style>
