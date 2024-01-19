import type { Classroom } from './Classroom'
import type { Group } from './Group'
import type { Lesson } from './Lesson'
import type { Schedule } from './Schedule'
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
  subjects: LecturerSubject[]
  surname: string
  updated?: string
}

interface LecturerSubject extends Subject {
  schedule: Schedule
  classroom: Classroom
  lessons: Lesson[]
  groups: Group[]
}