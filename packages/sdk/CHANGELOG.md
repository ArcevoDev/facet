# @arcevo/facet-sdk

## Unreleased

### Minor Changes

- feat(sdk): add `OAuthSdk.updateClient(clientId, data)` for full OAuth-client
  CRUD (PATCH `/oauth/clients/:clientId`). Backed by arc-id's
  `PATCH /oauth/clients/:clientId` route (requires `client:update` permission
  + PRO plan); returns `ApiResponse<OAuthClient>`, same shape as
  `createClient`. `UpdateClientParams` is exported from the package entry.

## 1.1.0

### Minor Changes

- b95bcb0: feat(sdk): OAuth2/OIDC integration for external consumers + refresh client_id

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
  - `TenantSdk.create()` now returns `ApiResponse<Tenant>` (was `void`).
    arc-id's POST /tenants responds with the created tenant — the void
    return meant consumers could not capture the new tenant id to operate
    on it (found by the live E2E: listMembers/getPolicy failed with
    'Invalid cuid').

## 1.0.1

### Patch Changes

- d94a724: chore: update homepage to facet.arcevocirqle.com.ng

## 1.0.0

### Major Changes

- e79cbd5: initial publish...
