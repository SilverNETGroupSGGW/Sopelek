export interface SubjectExtendedResult {
  id: string
  created: string // ISO date string
  updated: string // ISO date string
  scheduleId: string
  name: string
  typeId: string
  startTime: string // Time in "HH:mm:ss" format
  dayOfWeek: string
  duration: string // Time in "HH:mm:ss" format
  isRemote: boolean
  isConditional: boolean
  comment: string
  lecturers: SubjectExtendedLecturer[]
  groups: SubjectExtendedGroup[]
  lessons: SubjectExtendedLesson[]
  classroom: SubjectExtendedClassroom
}

interface SubjectExtendedLecturer {
  id: string
  created: string // ISO date string
  updated: string // ISO date string
  firstName: string
  surname: string
  academicDegree: string
  email: string
  institute: string
}

interface SubjectExtendedGroup {
  id: string
  created: string // ISO date string
  updated: string // ISO date string
  name: string
  capacity: number
}

interface SubjectExtendedLesson {
  id: string
  created: string // ISO date string
  updated: string // ISO date string
  iCalendarEvent: string
}

interface SubjectExtendedClassroom {
  id: string
  created: string // ISO date string
  updated: string // ISO date string
  name: string
  building: string
  floor: string
  capacity: number
}
