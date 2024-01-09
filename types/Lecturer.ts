import type { Subject } from "./Subject"

export interface Lecturer {
  academicDegree: string
  created?: string
  email: string
  firstName: string
  id: string
  subjects?: Subject[]
  surname: string
  updated?: string
}
