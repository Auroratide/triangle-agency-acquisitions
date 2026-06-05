<script lang="ts">
	import type { Metadata } from "../Metadata"
	import { MissionDocument } from "../Mission"
	import guideMd from "./guide.md?raw"

	let {
		metadata,
		expanded = false,
		onclose,
	}: {
		metadata: Metadata
		expanded?: boolean
		onclose: () => void
	} = $props()

	let elem: HTMLElement | undefined

	let top = $state(0)

	$effect(() => {
		if (expanded) {
			top = elem?.parentElement?.scrollTop ?? 0
		}
	})
</script>

<aside
	bind:this={elem}
	class="guide"
	inert={!expanded}
	hidden={!expanded}
	style:inset-block-start="{top}px"
>
	<div class="sticky-wrapper">
		<button
			type="button"
			class="close"
			aria-label="Close Guide"
			onclick={onclose}
		>
			✕
		</button>
	</div>
	<MissionDocument {metadata} content={guideMd} images={new Map()} nopages />
</aside>

<style>
	.guide {
		background: var(--bg);
		position: absolute;
		inset: 0 auto auto 0;
		max-inline-size: 100%;
		block-size: 100%;
		overflow-y: auto;
		z-index: 3;
		transform: translateX(0);
		transition: transform 0.22s ease;
	}

	.guide[hidden] {
		display: block;
		transform: translateX(-100%);
	}

	.guide :global(h2:first-child) {
		margin-block-start: 0;
	}

	.guide :global(h3) {
		margin-block-start: 1.25em;
	}

	.sticky-wrapper {
		position: sticky;
		inset-block-start: 0.75em;
		block-size: 0;
		overflow: visible;
	}

	.close {
		position: absolute;
		inset: 0 0.75em auto auto;
		background: var(--agency-red);
		color: var(--bg);
		border: none;
		font-weight: bold;
		padding: 0.5em;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5em;
		height: 2.5em;
		z-index: 9;
	}
</style>
