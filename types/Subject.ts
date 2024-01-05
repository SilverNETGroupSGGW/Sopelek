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

export interface Subject {
  id?: string
  created?: string
  updated?: string
  scheduleId?: string
  name?: string
  type?: SubjectType
  startTime: string
  dayOfWeek?: string
  duration: string
  isRemote?: boolean
  comment?: string
  
  lecturers?: Lecturer[]
  lecturersIds?: string[]

  groups?: Group[]
  groupsIds?: string[]

  lessons?: Lesson[]

  classroom?: Classroom
  classroomId?: string

  /* internal */
  x?: number
  y?: number
  width?: number
  height?: number
  ghost?: boolean
}