import type { RefreshResult, ApiResponse } from "@arcevo/facet-sdk";

/**
 * Minimal interface for a Zustand auth store that the token bridge needs.
 * Any store exposing these methods satisfies this structurally - the concrete
 * {@link AuthState} store is passed in by the consumer.
 */
export interface TokenStoreLike {
  getState: () => {
    accessToken: string | null;
    refreshToken: string | null;
  };
  setTokens: (accessToken: string, refreshToken?: string) => void;
  clearAuth: () => void;
}

/**
 * Interface for an SDK auth-like object that can refresh tokens.
 * Matches {@link AuthSdk.refresh} exactly.
 */
export interface TokenRefresher {
  refresh: (token: string) => Promise<ApiResponse<RefreshResult>>;
}

/**
 * Bridge between a Zustand auth store and the ArcIdClient's token-refresh hooks.
 *
 * - Reads refresh/access tokens from the store via `getState()`
 * - On a 401, calls `sdk.refresh()` → updates the store with the new token bundle
 * - Clears auth on refresh failure (expired/invalid refresh token)
 * - Re-entrancy guard prevents infinite recursion if the refresh request itself 401s
 */
export interface TokenStorage {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setTokens: (accessToken: string, refreshToken?: string) => void;
  clearTokens: () => void;
  onTokenRefresh: (failedToken: string) => Promise<string | null>;
}

export function createZustandTokenStorage({
  authStore,
  sdk,
}: {
  authStore: TokenStoreLike;
  sdk: TokenRefresher;
}): TokenStorage {
  // Re-entrancy guard: the client's request() retries with a fresh token after
  // onTokenRefresh resolves, but the refresh call itself goes through the same
  // client. If POST /oauth/token ever 401s, request() would call onTokenRefresh
  // again, recursing forever. The flag short-circuits the second entry so the
  // original failure path (clearing auth) runs instead.
  let refreshInFlight = false;

  return {
    getAccessToken: () => authStore.getState().accessToken ?? null,

    getRefreshToken: () => authStore.getState().refreshToken ?? null,

    setTokens: (accessToken, refreshToken) => {
      authStore.setTokens(accessToken, refreshToken);
    },

    clearTokens: () => {
      authStore.clearAuth();
    },

    onTokenRefresh: async () => {
      const state = authStore.getState();
      if (!state.refreshToken || refreshInFlight) return null;

      refreshInFlight = true;
      try {
        const { data, error } = await sdk.refresh(state.refreshToken);
        if (error || !data?.accessToken) {
          authStore.clearAuth();
          return null;
        }

        authStore.setTokens(data.accessToken, data.refreshToken);
        return data.accessToken;
      } finally {
        refreshInFlight = false;
      }
    },
  };
}
