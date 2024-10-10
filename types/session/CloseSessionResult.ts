export interface CloseSessionResult {
  date: Date
  status?: 'no session to close' | 'error' | 'closed'
  notClosedReason?: string
}
