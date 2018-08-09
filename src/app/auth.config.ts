import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'http://localhost:8180/auth/realms/alfresco',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.href,

  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri: window.location.href,

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'alfresco',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

  showDebugInformation: true,

  sessionChecksEnabled: false,

  requireHttps: false
}