<script lang="ts">
	import { MissionTheme } from "./MissionTheme.js"

	import "./mission-document.css"
	import { renderToPages } from "../markdown.ts"
	import LicenseAndCredits from "./LicenseAndCredits.svelte"
	import { scalePages } from "./scale-pages"

	let {
		theme,
		content,
		images,
	}: {
		theme: MissionTheme
		content: string
		images: Map<string, string>
	} = $props()

	let renderedHtml = $derived(renderToPages(content, images))
</script>

<div
	class="mission-document"
	use:scalePages
	style="--primary-color: {theme.primary || MissionTheme.DEFAULT.primary}; --secondary-color: {theme.secondary || MissionTheme.DEFAULT.secondary}"
>
	<LicenseAndCredits />
	{@html renderedHtml}
</div>
