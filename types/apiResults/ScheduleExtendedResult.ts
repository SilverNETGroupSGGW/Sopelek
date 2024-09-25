import type { SubjectTypeResult } from './SubjectTypeResult'

export interface ScheduleExtendedResult {
  id: string
  created: string
  updated: string
  name: string
  isDraft: boolean
  studySemesterId: string
  tenantId: string
  groups: ScheduleGroupExtended[]
  subjects: ScheduleSubjectExtended[]
}

interface ScheduleGroupExtended {
  id: string
  created: string
  updated: string
  name: string
  capacity: string
}

interface ScheduleSubjectExtended {
  id: string
  created: string
  updated: string
  name: string
  type: SubjectTypeResult
  startTime: string
  dayOfWeek: string
  duration: string
  isRemote: boolean
  comment: string

  lecturers: ScheduleLecturerExtended[]
  groups: ScheduleGroupExtended[]
  lessons: ScheduleLessonExtended[]
  classroom: ScheduleClassroomExtended
}

interface ScheduleLecturerExtended {
  id: string
  created: string
  updated: string
  firstName: string
  surname: string
  academicDegree: string
  email: string
  institute: string
}

interface ScheduleGroupExtended {
  id: string
  created: string
  updated: string
  name: string
  capacity: string
}

interface ScheduleLessonExtended {
  id: string
  created: string
  updated: string
  numberOfLesson: number
  startTime: string
  duration: string
  iCalendarEvent: string
}

interface ScheduleClassroomExtended {
  id: string
  created: string
  updated: string
  name: string
  building: string
  floor: string
  capacity: number
}
