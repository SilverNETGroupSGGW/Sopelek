import type { Subject } from './Subject'

export interface Schedule {
  created?: string
  degreeOfStudy: string
  faculty: string
  fieldOfStudy: string
  id: string
  name: string
  semester: number
  startDate: string
  studyMode: string
  subjects: Subject[]
  updated?: string
  year: number
}
