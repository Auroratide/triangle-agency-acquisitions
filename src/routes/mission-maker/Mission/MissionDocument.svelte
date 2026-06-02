<script lang="ts">
	import { MissionTheme } from "./MissionTheme.js"

	import "./mission-document.css"
	import { renderToPages } from "../markdown.ts"
	import LicenseAndCredits from "./LicenseAndCredits.svelte"
	import type { MissionMetadata } from "./MissionMetadata.ts"
	import { scalePages } from "./scale-pages"
	import TitlePage from "./TitlePage.svelte"

	let {
		theme,
		metadata,
		content,
		images,
	}: {
		theme: MissionTheme
		metadata: MissionMetadata
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
	<TitlePage {metadata} />
	<LicenseAndCredits {metadata} />
	{@html renderedHtml}
</div>
