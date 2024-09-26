export interface StudySemesterResult {
  id: string
  created: string // ISO date string
  updated: string // ISO date string
  year: number
  semester: number
  startDate: string // ISO date string
  studyProgramId: string
}
