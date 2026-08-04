/**
 * Auth SDK: Login, register, MFA, sessions, magic link, password management
 *
 * Matches arc-id's actual /auth/* endpoints (verified against
 * arc-id src/modules/auth/routes/* + src/lib/api/routes/index.ts).
 */

import { ArcIdClient } from "./client.js";
import type { ApiResponse } from "./client.js";
import type {
  LoginResult,
  OAuthTokenResponse,
  RegisterResult,
  Session,
  TokenBundle,
  User,
} from "./types.js";

/* ── Types ─────────────────────────────────────────────────── */

/** Result of a completed auth flow: tokens + resolved identity. */
export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type MfaVerifyResult = TokenBundle;

export type MfaSetupResult = {
  secret: string;
  qrCode: string;
  uri: string;
};

export type RecoveryCodesResult = {
  recoveryCodes: string[];
};

export type StepUpResult = {
  success: true;
  elevatedUntil: string;
};

export type UserProfile = User;

export type SwitchContextResult = TokenBundle;

/** Normalized refresh result from the bare RFC 6749 token endpoint. */
export type RefreshResult = {
  accessToken: string;
  refreshToken?: string;
  idToken?: string | null;
  expiresIn?: number;
};

/* ── SDK Module ────────────────────────────────────────────── */

export class AuthSdk {
  constructor(private client: ArcIdClient) {}

  /**
   * POST /auth/login.
   * Returns a sessionId (with requiresMfa) or a full token bundle when
   * MFA is not required for this identity.
   */
  login(email: string, password: string): Promise<ApiResponse<LoginResult>> {
    return this.client.post<LoginResult>("/auth/login", { email, password });
  }

  /** POST /auth/register. arc-id returns only the identity (no tokens). */
  register(name: string, email: string, password: string): Promise<ApiResponse<RegisterResult>> {
    return this.client.post<RegisterResult>("/auth/register", {
      name,
      email,
      password,
    });
  }

  logout(sessionId: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/logout", { sessionId });
  }

  /** GET /identity/profile: resolves the current identity from the bearer token. */
  me(): Promise<ApiResponse<UserProfile>> {
    return this.client.get<UserProfile>("/identity/profile");
  }

  listSessions(): Promise<ApiResponse<Session[]>> {
    return this.client.get<Session[]>("/auth/sessions");
  }

  revokeSession(sessionId: string): Promise<ApiResponse<void>> {
    return this.client.del<void>(`/auth/sessions/${sessionId}`);
  }

  forgotPassword(email: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/password/reset", { email });
  }

  resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/password/reset/confirm", {
      token,
      newPassword,
    });
  }

  verifyEmail(token: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/email/verify", { token });
  }

  verifyMfa(code: string, sessionId: string): Promise<ApiResponse<TokenBundle>> {
    return this.client.post<TokenBundle>("/auth/mfa/verify", {
      code,
      sessionId,
    });
  }

  setupMfa(): Promise<ApiResponse<MfaSetupResult>> {
    return this.client.post<MfaSetupResult>("/auth/mfa/setup", {
      type: "TOTP",
    });
  }

  confirmMfa(code: string): Promise<ApiResponse<RecoveryCodesResult>> {
    return this.client.post<RecoveryCodesResult>("/auth/mfa/confirm", {
      code,
    });
  }

  disableMfa(): Promise<ApiResponse<void>> {
    return this.client.del<void>("/auth/mfa/disable");
  }

  stepUp(
    method: "password" | "totp" | "passkey",
    sessionId: string,
    credential: {
      password?: string;
      totpCode?: string;
      passkeyResponse?: unknown;
      passkeyChallengeId?: string;
    },
  ): Promise<ApiResponse<StepUpResult>> {
    return this.client.post<StepUpResult>("/auth/step-up", {
      method,
      sessionId,
      ...credential,
    });
  }

  mfaRecovery(code: string, sessionId: string): Promise<ApiResponse<TokenBundle>> {
    return this.client.post<TokenBundle>("/auth/mfa/recovery", {
      code,
      sessionId,
    });
  }

  changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/password/change", {
      currentPassword,
      newPassword,
    });
  }

  requestMagicLink(email: string): Promise<ApiResponse<void>> {
    return this.client.post<void>("/auth/magic-link/request", { email });
  }

  authenticateMagicLink(token: string): Promise<ApiResponse<LoginResult>> {
    return this.client.post<LoginResult>("/auth/magic-link", { token });
  }

  /**
   * POST /oauth/token (bare RFC 6749 response).
   * Normalizes snake_case access_token/refresh_token to camelCase.
   */
  async refresh(refreshToken: string): Promise<ApiResponse<RefreshResult>> {
    const res = await this.client.post<OAuthTokenResponse>(
      "/oauth/token",
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
      { bare: true },
    );
    if (res.data) {
      return {
        data: {
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          idToken: res.data.id_token ?? null,
          expiresIn: res.data.expires_in,
        },
        error: null,
      };
    }
    return res as unknown as ApiResponse<RefreshResult>;
  }

  setUsername(name: string): Promise<ApiResponse<void>> {
    return this.client.patch<void>("/auth/username", { name });
  }
}
