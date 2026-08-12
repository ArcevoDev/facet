---
"@arcevo/facet-layout": patch
"@arcevo/facet-docs": patch
---

fix: mobile overflow, contained layout docs, settings menu cleanup

- layout: responsive `p-4 md:p-8` main padding, `px-4 md:px-6` topbar,
  and a `w-40 sm:w-64` search trigger so the docs shell fits phones.
- docs: the /layout page documents full app shells code-first (their
  fixed-position sidebars escaped the docs shell); standalone Sidebar +
  Topbar and pill Navbar keep live previews.
- docs: settings gear no longer duplicates the theme toggle (it has its
  own icon); it now shows ecosystem links + a Ctrl+K search hint.
- docs: accordion previews now show 3 items so spacing consistency is
  visible; Docs Package + Layout pages moved under the Ecosystem section.
- apps/docs + apps/landing vercel.json SPA-fallback rewrites fix 404s on
  deep-route refresh.
