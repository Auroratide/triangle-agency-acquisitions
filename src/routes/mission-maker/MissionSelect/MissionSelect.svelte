<script lang="ts">
	import { Button } from "$lib/Button"
	import { DrawerDialog } from "$lib/DrawerDialog"
	import type { DocumentIdAndName, Id } from "$lib/db"

	let {
		selected,
		missions,
		dialog = $bindable(),
		onnew,
		onselect,
	}: {
		selected: Id
		missions: DocumentIdAndName[]
		dialog: HTMLDialogElement | undefined
		onnew: () => Promise<void>
		onselect: (id: Id) => Promise<void>
	} = $props()

	function close() {
		dialog?.close()
	}

	let loading = $state(false)

	async function onSelectMissionClick(id: Id) {
		loading = true
		try {
			await onselect(id)
			close()
		} finally {
			loading = false
		}
	}

	async function onNewMissionClick() {
		loading = true
		try {
			await onnew()
			close()
		} finally {
			loading = false
		}
	}
</script>

<DrawerDialog bind:dialog id="mission-select-dialog" title="Select Mission">
	<strong class="bigger-button">
		<Button onclick={onNewMissionClick} disabled={loading} size="full"
			>New Mission</Button
		>
	</strong>
	<ul>
		{#each missions as mission (mission.id)}
			{@const isCurrentMission = mission.id === selected}
			<li class:selected={isCurrentMission}>
				<Button
					variant={isCurrentMission ? "blue" : "ink"}
					onclick={() => onSelectMissionClick(mission.id)}
					disabled={loading || isCurrentMission}
					size="full"
					>{mission.name}</Button
				>
			</li>
		{/each}
	</ul>
</DrawerDialog>

<style>
	ul {
		padding-inline-start: 1em;
	}

	ul li {
		padding-inline-start: 0.5em;
		margin-block-end: 0.5em;
	}

	ul li::marker {
		content: "▶";
		display: inline-block;
		color: var(--agency-ink);
	}

	li :global(button) {
		display: block;
		text-align: start;
	}

	li:hover::marker {
		color: var(--agency-red);
	}

	li.selected::marker,
	li.selected:hover::marker {
		color: var(--anomaly-blue);
	}

	.bigger-button {
		display: block;
		inline-size: 100%;
		font-size: 1.1em;
		text-transform: uppercase;
	}
</style>
