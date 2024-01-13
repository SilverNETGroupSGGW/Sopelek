import type { Subject } from './Subject'

export enum AcademicDegree {
  AssociateDegree = 'AssociateDegree',
  BachelorsDegree = 'BachelorsDegree',
  MastersDegree = 'MastersDegree',
  DoctoralDegree = 'DoctoralDegree',
  ProfessionalDegrees = 'ProfessionalDegrees',
}

export interface Lecturer {
  academicDegree: AcademicDegree
  created?: string
  email: string
  firstName: string
  id: string
  subjects?: Subject[]
  surname: string
  updated?: string
}
