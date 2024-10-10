export interface RefreshSessionResult {
  date: Date
  status?: 'no session to refresh' | 'error' | 'refreshed' | 'refresh token expired'
  accessToken?: string
  refreshToken?: string
}
