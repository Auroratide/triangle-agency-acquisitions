# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

A SvelteKit app of small tools for the TTRPG Triangle Agency. Uses `adapter-static` (no SSR).

## Commands

```bash
pnpm dev          # dev server at localhost:3000
pnpm build        # production build
pnpm check        # svelte-check type checking
pnpm test         # run all tests (single run)
pnpm test:unit    # run tests in watch mode
pnpm lint         # biome lint
pnpm format       # biome format (writes in place)
```

Run a single test file:
```bash
pnpm test:unit -- src/lib/path/to/file.spec.ts
```

## Testing

Vitest is configured with two projects:

- **client** — browser tests via Playwright/Chromium. File pattern: `*.svelte.spec.ts`. Use `vitest-browser-svelte` to render components and `vitest/browser`'s `page` for assertions.
- **server** — Node environment. File pattern: `*.spec.ts` (excluding `*.svelte.spec.ts`).

## Code style

Biome handles linting and formatting (not ESLint/Prettier). The pre-commit hook auto-formats staged files via `biome check --staged --write`, so manual formatting before commit is optional.

- Indentation: tabs
- Quotes: double
- Semicolons: only when required

Svelte 5 **runes mode is enforced** project-wide (`$state`, `$derived`, `$effect`, etc.). Do not use legacy Svelte reactive syntax (`$:`, `export let`).
