import type { StateInline } from "markdown-it/index.js"

/*
 * Sonnet 4.6
 * Can you make a markdown rule that expands `@icon-name@` to `<img class="icon" alt="Icon Name" src="/icons/icon-name.svg" />`
 */

/**
 * Syntax: @icon-name@
 */
export function Icons() {
	return (state: StateInline, silent: boolean) => {
		if (state.src.charCodeAt(state.pos) !== 0x40 /* @ */) return false

		const end = state.src.indexOf("@", state.pos + 1)
		if (end < 0) return false

		const name = state.src.slice(state.pos + 1, end)
		if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) return false

		if (!silent) {
			const alt = name
				.split("-")
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
				.join(" ")
			const token = state.push("html_inline", "", 0)
			token.content = `<img class="icon" alt="${alt}" src="/icons/${name}.svg">`
		}

		state.pos = end + 1
		return true
	}
}
