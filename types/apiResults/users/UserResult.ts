export interface UserResult {
  id: string
  createdAt: Date
  updatedAt: Date
  userName: string
  email: string
  language: string
  welcomeEmailSent: boolean
  deviceToken: string | null
  lastActiveAt: Date
  tenantId: string | null
}
