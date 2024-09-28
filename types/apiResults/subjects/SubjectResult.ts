import type { LessonResult } from '../lesson/LessonResult'

export interface SubjectResult {
  id: string
  scheduleId: string
  name: string
  typeId: string
  startTime: string
  dayOfWeek: string
  duration: string
  isConditional: boolean
  lecturersIds: string[]
  groupsIds: string[]
  classroomId: string
  comment: string

  lessons?: LessonResult[]
}
