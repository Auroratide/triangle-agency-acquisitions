<script lang="ts">
	import CompatibilityLogo from "./compatibility-logo.svg"
	import type { MissionMetadata } from "./MissionMetadata"

	let {
		metadata,
	}: {
		metadata: MissionMetadata
	} = $props()

	const formatter = new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	})

	let dateUpdated = $derived(formatter.format(metadata.updated))
</script>

<section class="page license">
	<img
		class="compatibility-logo"
		alt="Agency Compatible"
		src="{CompatibilityLogo}"
	>
	<p class="main-title">
		<strong>{metadata.title}</strong>: {metadata.subtitle}
	</p>
	<p class="date">Last updated {dateUpdated}</p>
	<p class="content-warnings">Content Warnings: {metadata.contentWarnings}</p>
	<hr class="page-space">
	<p>
		<strong>
			{metadata.title}
			is an independent production by {metadata.author} and is not affiliated
			with Triangle Agency or Haunted Table, LLC. It is published under the
			Triangle Agency Third Party License.</strong
		>
	</p>
	<p><strong>Triangle Agency is copyright Haunted Table, LLC.</strong></p>
</section>
<section class="page license">
	<h3>Credits</h3>
	<p><strong>Writing:</strong> {metadata.author}</p>
	<p><strong>Illustration:</strong> {metadata.artist}</p>
	<hr class="small-space">
	<p>
		<strong>Triangle Agency Icons</strong>
		by Michael Shillingburg,<br>licensed under the Third Party Publishing
		License.
	</p>
	<p><strong>Layout</strong> based on a template by Ben Mansky.</p>
	<p><strong>Poppins Font</strong> by Jonny Pinhorn and Ninad Kale.</p>
	<p>Made with the <strong>Mission Maker Acquisition</strong> by Auroratide.</p>
</section>

<style>
	.license {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		gap: 0;
	}

	.license p {
		margin-block-start: 0;
	}

	.compatibility-logo {
		display: block;
		margin-block-end: 0.333in;
		inline-size: 3in;
	}

	h3 {
		margin-block-start: 0;
	}

	.main-title {
		font-size: var(--font-md);
		margin-block: 2em;
	}

	.main-title strong {
		color: var(--agency-red);
	}

	.page-space {
		border: none;
		background: none;
		flex: 1;
	}

	.small-space {
		border: none;
		background: none;
		margin-block-end: 1in;
	}

	.date {
		margin-block: 0 16pt;
	}

	.content-warnings {
		font-style: italic;
	}

	.page.license {
		display: none;
	}

	@media print {
		.page.license {
			display: flex;
		}
	}
</style>
