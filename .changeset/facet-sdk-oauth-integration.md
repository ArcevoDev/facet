---
"@arcevo/facet-sdk": minor
---

feat(sdk): OAuth2/OIDC integration for external consumers + refresh client_id

The SDK is now a proper OAuth2/OIDC client for third-party integrations,
not just a first-party session client:

- `ArcIdClientConfig` gains `clientId` + `clientSecret` (optional), and
  `ArcIdClient.setClientCredentials()` for dynamic integration.
- `AuthSdk.refresh()` now sends `client_id` (and `client_secret`) when
  configured — required by arc-id's TokenExchangeSchema for all clients
  (the backend defaults only cover the first-party direct client).
- New `AuthSdk.exchangeCode()` — authorization_code grant with PKCE
  (`code_verifier`) + redirect_uri.
- New `AuthSdk.clientCredentials()` — service-to-service tokens.
- New `AuthSdk.authorizeUrl()` — OIDC authorize redirect builder
  (client_id, redirect_uri, scope, state, nonce, PKCE S256 challenge,
  prompt, max_age).
- New `AuthSdk.switchContext({ tenantId })` — POST /auth/switch-context,
  with the result typed to arc-id's real response shape (was TokenBundle,
  which requires sessionId the route does not return).
