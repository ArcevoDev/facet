---
"@arcevo/facet-components": minor
---

feat(components): add a slim `/light` subpath entry

`@arcevo/facet-components/light` re-exports only the lightweight,
high-frequency modules (cn, Button, Icon registry, ThemeProvider/useTheme/
ThemeToggle, DropdownMenu family, Kbd, Tabs). Consumers whose eager app
shell only needs those can import from `/light` instead of the full barrel,
so the heavy components (Dialog, Form, Dropzone, QRCode, InputOTP, ...)
stay out of the initial bundle.

```ts
import { Icon, ThemeProvider, DropdownMenu } from "@arcevo/facet-components/light";
```
