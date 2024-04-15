export interface Account {
  id: string
  userName: string
  email: string
  isEmailConfirmed: boolean
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  roles: string[]
  tenantId: string | null
}
