export interface TenantResult {
  id: string
  created: Date
  updated: Date
  name: string
  ownerId: string | null
  organizationId: string | null
}
