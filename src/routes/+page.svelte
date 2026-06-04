<script lang="ts">
	import { PageMeta } from "$lib/PageMeta"
	import { ToolCard } from "$lib/ToolCard"
	import Footer from "./Footer.svelte"
</script>

<PageMeta
	title="Triangle Agency Acquisitions"
	description="Community tools for the tabletop game, Triangle Agency"
/>

<div class="wrapper">
	<div class="bg"></div>
	<div class="container">
		<main>
			<h1>
				Triangle Agency <br>
				Acquisitions
			</h1>
			<div class="description">
				<p>
					Community tools made by
					<strong><a href="https://auroratide.com">Auroratide</a></strong>
					for the tabletop role-playing game,
					<strong
						><a href="https://hauntedtable.itch.io/triangle-agency"
							>Triangle Agency</a
						></strong
					>, by Haunted Table, LLC.
				</p>
			</div>
			<nav>
				<ToolCard
					title="Mission Maker"
					href="/mission-maker"
					description="Easily create beautiful documents of missions that you can share with the community, using just a text-based editor! What, it's not wysiwyg? Yeah, we know. They didn't have wysiwyg in the 80s, you'll figure it out."
				/>
			</nav>
		</main>
	</div>
	<Footer />
</div>

<style>
	.wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		max-inline-size: min(1920px, 100%);
		min-block-size: 100vh;
		margin-inline: auto;
		container-type: inline-size;
		overflow: hidden;
	}

	.bg {
		position: absolute;
		background: var(--agency-red);
		inline-size: 100cqi;
		aspect-ratio: 1;
		min-inline-size: 50rem;
		inset: 0 auto auto min(-15cqi, -7.5rem);
		clip-path: polygon(0 0, 100% 0, 50% 86.6%);
		z-index: 1;
	}

	.container {
		flex: 1;
		position: relative;
		max-inline-size: 50rem;
		padding: clamp(1em, 3vw, 2em);
		z-index: 2;
	}

	h1 {
		font-size: clamp(1.75em, 8vw, 4.75em);
		line-height: 0.875;
		color: var(--bg);
		text-transform: uppercase;
		margin: 0 0 0.5em 0;
	}

	.description {
		background: var(--agency-gray);
		font-size: clamp(1em, 2vw, 1.375em);
		padding: 1em 35em 1em 1em;
		margin: 0 -35em 2em 0;
		text-wrap: balance;
	}

	.description p {
		margin: 0;
	}
</style>
