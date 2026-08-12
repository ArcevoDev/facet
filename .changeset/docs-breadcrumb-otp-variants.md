---
"@arcevo/facet-docs": patch
---

docs: add Breadcrumb ellipsis + InputOTP 8-digit variants

- Breadcrumb: new "Ellipsis" demo/usage showing BreadcrumbEllipsis between
  items (component already existed; it's now showcased).
- InputOTP: new "8-digit" demo/usage. Paste-spread, 8-digit maxLength, and
  cap-at-maxLength behavior verified by a new component test
  (packages/components input-otp.test.tsx, 4 tests).
