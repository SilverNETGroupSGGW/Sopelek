export interface LoginResult {
  hasError?: boolean
  errorMessage?: string
  accessToken?: string
  refreshToken?: string
}
