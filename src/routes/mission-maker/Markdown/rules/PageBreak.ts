/**
 * We replace ---- with a page break, as that's the most straightforward syntax
 */
export function PageBreak() {
	return () => '<div class="page-break"></div>\n'
}
