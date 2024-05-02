import type { Classroom } from './Classroom'
import type { Group } from './Group'
import type { Lecturer } from './Lecturer'
import type { Lesson } from './Lesson'

export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export interface SubjectConflict {
  message: string
  conflicts: SubjectConflictItem[]
}

export interface SubjectConflictItem {
  mainSubject: Subject
  otherSubject: Subject
  conflictStartTime: string
  conflictDuration: string
}

export interface Subject {
  classroom?: Classroom | null
  classroomId?: string | null
  comment?: string
  created?: string
  dayOfWeek?: DayOfWeek
  duration?: string
  groups?: Group[]
  groupsIds?: string[]
  id: string
  isRemote?: boolean
  isConditional?: boolean
  lecturers?: Lecturer[]
  lecturersIds?: string[]
  lessons?: Lesson[]
  name?: string
  scheduleId?: string
  startTime: string
  typeId?: string
  updated?: string

  /* internal */
  conflict?: boolean
  conflictMessage?: string
  ghost?: boolean
  height?: number
  width?: number
  x?: number
  y?: number
  zIndex?: number
}
