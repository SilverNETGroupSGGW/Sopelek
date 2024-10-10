export interface CreateSessionResult {
  email: string
  date: Date
  status?: 'created' | 'not created'
  notCreatedReason?: string
  accessToken?: string
  refreshToken?: string
}
