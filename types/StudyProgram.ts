export interface StudyProgram {
  id: string
  created?: Date
  updated?: Date
  name: string
  faculty: string
  fieldOfStudy: string
  studyMode: string
  degreeOfStudy: string
  startDate: Date
  tenantId?: string
}
