<script lang="ts">
	import type { Snippet } from "svelte"
	import { Button } from "$lib/Button"

	let {
		children,
		onclick,
		active = false,
	}: {
		children?: Snippet
		onclick?: () => void
		active?: boolean
	} = $props()
</script>

<li>
	<Button variant={active ? "yellow" : "gray"} {onclick}
		>{@render children?.()}</Button
	>
</li>
