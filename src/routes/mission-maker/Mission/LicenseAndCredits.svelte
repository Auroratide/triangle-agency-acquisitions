<script lang="ts">
	import CompatibilityLogo from "./compatibility-logo.svg"
</script>

<section class="page license">
	<img
		class="compatibility-logo"
		alt="Agency Compatible"
		src="{CompatibilityLogo}"
	>
	<p class="main-title"><strong>[Document Title]</strong>: [Subtitle]</p>
	<p class="version">Version: #.#</p>
	<p class="date">Last updated 02 Jun 2026</p>
	<hr class="page-space">
	<p>
		<strong
			>[Product name] is an independent production by [author or publisher] and
			is not affiliated with Triangle Agency or Haunted Table, LLC. It is
			published under the Triangle Agency Third Party License.</strong
		>
	</p>
	<p><strong>Triangle Agency is copyright Haunted Table, LLC.</strong></p>
</section>
<section class="page license">
	<h3>Credits</h3>
	<p><strong>Designer:</strong> [Designer]</p>
	<p><strong>Artists:</strong> [artists]</p>
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

	.version {
		margin-block: 0;
	}

	.date {
		margin-block: 0;
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
