export interface SubjectConflictQuery {
  scheduleId: string
  groups: string[]
  dayOfWeek: string // 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
  startTime: string // Time in "HH:mm:ss" format
  duration: string // Time in "HH:mm:ss" format
}
