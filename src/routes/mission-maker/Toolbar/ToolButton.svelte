<script lang="ts">
	import type { Snippet } from "svelte"
	import { Button } from "$lib/Button"

	let {
		children,
		onclick,
	}: {
		children?: Snippet
		onclick?: () => void
	} = $props()
</script>

<li><Button variant="gray" {onclick}>{@render children?.()}</Button></li>
