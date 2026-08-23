---
"@arcevo/facet-components": patch
"@arcevo/facet-auth": patch
"@arcevo/facet-layout": patch
---

Add an ESM `"use client"` banner to the `dist` builds of `@arcevo/facet-components`,
`@arcevo/facet-auth`, and `@arcevo/facet-layout`.

Next.js 15+/16 App Router builds React Server Components with the `react-server`
condition, which resolves `react-hook-form` to `react-server.esm.mjs` - an entry that
does not export `Controller`, `FormProvider`, `useForm`, or `useFormContext`. Importing
any of these packages from a Server Component therefore failed the build with
`Export Controller/FormProvider/useForm/useFormContext doesn't exist in target module`.

The banner marks each package's module graph as a client boundary, so those imports
resolve to the normal client entry under RSC. The directive is a no-op for non-RSC
consumers (Vite/CRA/Rolldown ignore it), so this is a transparent fix.

Consumers hitting the Next 16 error pick this up on the next published release.
