<script lang="ts">
	import { page } from "$app/state"

	let {
		title,
		description,
	}: {
		title: string
		description: string
	} = $props()
</script>

<svelte:head>
	{#if title !== "Triangle Agency Acquisitions"}
		<title>{title} | Triangle Agency Acquisitions</title>
	{:else}
		<title>Triangle Agency Acquisitions</title>
	{/if}
	<meta name="description" content="{description}">

	<meta property="og:title" content="{title}">
	<meta property="og:description" content="{description}">
	<meta
		property="og:image"
		content="https://triangle.auroratide.com/favicon.png"
	>
	<meta property="og:image:width" content="128">
	<meta property="og:image:height" content="128">
	<meta property="og:url" content="{page.url.toString()}">
	<meta property="og:type" content="website">
	<meta property="og:site_name" content="Triangle Agency Acquisitions">
	<meta property="og:locale" content="en_US">
</svelte:head>
