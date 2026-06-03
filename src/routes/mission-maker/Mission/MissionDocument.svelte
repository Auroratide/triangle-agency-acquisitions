<script lang="ts">
	import "./mission-document.css"
	import { Markdown } from "../Markdown/index.ts"
	import LicenseAndCredits from "./LicenseAndCredits.svelte"
	import type { MissionMetadata } from "./MissionMetadata.ts"
	import { MissionTheme } from "./MissionTheme.js"
	import { scalePages } from "./scale-pages"
	import TitlePage from "./TitlePage.svelte"

	let {
		metadata,
		content,
		images,
	}: {
		metadata: MissionMetadata
		content: string
		images: Map<string, string>
	} = $props()

	let renderedHtml = $derived(Markdown.renderToPages(content, images))
</script>

<div
	class="mission-document"
	use:scalePages
	style="--primary-color: {metadata.primaryColor || MissionTheme.DEFAULT.primary}; --secondary-color: {metadata.secondaryColor || MissionTheme.DEFAULT.secondary}"
>
	<TitlePage {metadata} />
	<LicenseAndCredits {metadata} />
	{@html renderedHtml}
</div>
