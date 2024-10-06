export interface ScheduleResult {
  id: string
  created: string // Date as an ISO string
  updated: string // Date as an ISO string
  scheduleId: string
  name: string
  typeId: string
  startTime: string // Time as "HH:MM:SS"
  dayOfWeek: string // "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  duration: string // Duration as "HH:MM:SS"
  isRemote: boolean
  isConditional: boolean
  comment: string
  groupsIds: string[]
  classroomId: string
  lecturersIds: string[]
}
