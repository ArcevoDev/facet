# @arcevo/facet-story

facet-story: a Storybook-style component gallery and documentation site for
the Arcevo ecosystem. It is a **demo plus a customization template**: the
built `dist/` can be hosted as-is, and the `src/` ships the pieces you edit
to make it your own (Storybook-style component browsing, per-component
variant pages, install tabs, and an optional ecosystem links section).

## What you get

- **Demo** (`dist/`): a static, hostable docs site built on `@arcevo/facet-*`.
  Preview locally with `pnpm dev` / `pnpm preview`.
- **Sidebar**: a clean, text-only link list that collapses to an icon-only
  rail (VS Code style). In the rail, each nav section is one icon slot so
  all sections sit together with no scroll (YouTube style); the full item
  list shows only when the sidebar is expanded.
- **Search**: a real search bar in the topbar (icon + placeholder + "Ctrl K"
  badge). Clicking it, or pressing `Ctrl/Cmd+K`, opens an inline results
  panel right under the bar (no full-screen modal) that searches every
  sidebar route and quick action, grouped by section. Groups are derived
  dynamically from the nav config, so a consumer's own docs structure is
  searchable automatically.
- **Customization source** (`src/`): everything you need to fork:
  - `src/lib/nav.tsx`: branding, sidebar sections, and the optional
    `ecosystem` links (add future ecosystem docs here).
  - `src/components/previews.tsx`: one compact demo per component;
    reused for the `/components` preview cards and page demos.
  - `src/pages/`: guide pages plus the per-component variant pages.
  - `src/components/InstallTabs.tsx`: compact pnpm / npm / yarn / bun
    install tabs (the code block stays full width; only the manager
    chips are compact).

## Component browsing

- `/components` lists every component as a paginated set (12 per page) with
  a **grid/list toggle** and a **dynamic column selector** (2/3/4 columns)
  in grid view. Each grid card shows a live preview by default; collapse it
  to see only the name. List view shows compact rows. Click a component to
  open its page.
- `/components/:slug` shows the component's full variant gallery in
  labeled cells (Storybook-style), a live demo card with controls, and a
  usage code block with a copy button.

## Customize

1. **Branding + nav**: edit `src/lib/nav.tsx`.
   - `docsSiteConfig.brand`: name, tagline, logo.
   - `docsSiteConfig.navigation`: sections and items (these feed both the
     sidebar and the search palette groups).
   - `docsSiteConfig.ecosystem`: optional last section linking to
     ecosystem product docs (arc-id today, more later).
2. **Component previews**: edit `src/components/previews.tsx` to tweak the
   inline demo for any slug.
3. **Variant galleries**: edit `src/lib/variants.tsx` to add labeled
   variant cells for a slug.
4. **Usage snippets**: edit `src/lib/usage.ts` to add a hand-written
   import + usage example for a slug.
5. **Pages**: edit or add files in `src/pages/`, then register routes in
   `src/app.tsx`.

## Publish

The package publishes to npm under `@arcevo/facet-story`. It ships
`dist` (the demo) and `src` (the template) so consumers can either host
the demo or copy the source to customize. Versioning and publishing use
the repo-wide Changesets pipeline.
