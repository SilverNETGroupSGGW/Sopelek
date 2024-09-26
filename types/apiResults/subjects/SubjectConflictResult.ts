import type { SubjectResult } from './SubjectResult'

export interface SubjectConflictsResult {
  message: string
  conflicts: Conflict[]
}

interface Conflict {
  mainSubject: SubjectResult
  otherSubject: SubjectResult
  conflictStartTime: string // Time in "HH:mm:ss" format
  conflictDuration: string // Time in "HH:mm:ss" format
}
