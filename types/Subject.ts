import type { Classroom } from './Classroom'
import type { Group } from './Group'
import type { Lecturer } from './Lecturer'
import type { Lesson } from './Lesson'

export enum SubjectType {
  Lecture = 'Lecture',
  PracticalClasses = 'PracticalClasses',
  Laboratories = 'Laboratories',
  Unknown = 'Unknown',
  Faculty = 'Faculty',
}

export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export interface Subject {
  classroom?: Classroom
  classroomId?: string
  comment?: string
  created?: string
  dayOfWeek?: DayOfWeek
  duration?: string
  groups?: Group[]
  groupsIds?: string[]
  id: string
  isRemote?: boolean
  lecturers?: Lecturer[]
  lecturersIds?: string[]
  lessons?: Lesson[]
  name?: string
  scheduleId?: string
  startTime: string
  type?: SubjectType
  updated?: string

  ghost?: boolean
  height?: number
  width?: number
  x?: number
  y?: number
}
