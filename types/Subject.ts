import type { Group, Lecturer, Lesson } from '.'

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
  id: string
  created: string
  updated: string
  name: string
  isDraft: boolean
  studySemesterId: string
  tenantId: string
  groups: Group[]
  subjects: SubjectDetail[]
}

export interface SubjectDetail {
  id: string
  created: string
  updated: string
  scheduleId: string
  name: string
  type: SubjectType
  startTime: string
  dayOfWeek: DayOfWeek
  duration: string
  isRemote: boolean
  comment: string
  lecturers: Lecturer[]
  groups: Group[]
  lessons: Lesson[]
  classroom: Classroom

  /* internal */
  ghost?: boolean
  height?: number
  width?: number
  x?: number
  y?: number
}

export interface SubjectType {
  id: string
  created: string
  updated: string
  name: string
  isPrimitiveType: boolean
  tenantId: string
  // tenant: Tenant
}

export interface Classroom {
  id: string
  created: string
  updated: string
  name: string
  building: string
  floor: string
  capacity: number
}
