export interface OffDayResult {
  id: string
  created: Date
  updated: Date
  date: Date
  scope: string
  reason: string
  organizationId?: string
  tenantId?: string
  scheduleId?: string
  groupId?: string
}
