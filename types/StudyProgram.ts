import type { DegreeOfStudy, StudyMode } from './Schedule'

export interface StudyProgram {
  id: string
  created: string
  updated: string
  name: string
  degreeOfStudy: DegreeOfStudy
  studyMode: StudyMode
  faculty: string
  fieldOfStudy: string
  startDate: string
  year: number
  semester: number
  tenantId: string
}
