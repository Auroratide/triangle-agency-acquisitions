export function scalePages(node: HTMLElement) {
	const PAGE_WIDTH_PX = 8.5 * 96

	function measure() {
		const style = getComputedStyle(node)
		const available =
			node.clientWidth -
			parseFloat(style.paddingLeft) -
			parseFloat(style.paddingRight)
		const scale = Math.min(1, available / PAGE_WIDTH_PX)
		node.style.setProperty("--page-scale", String(scale))
	}

	const ro = new ResizeObserver(measure)
	ro.observe(node)
	measure()

	return { destroy: () => ro.disconnect() }
}
