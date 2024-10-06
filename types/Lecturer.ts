import type { Classroom } from './Classroom'
import type { Group } from './Group'
import type { Lesson } from './Lesson'
import type { Schedule } from './Schedule'
import type { Subject } from './Subject'

enum AcademicDegree {
  AssociateDegree = 'AssociateDegree',
  BachelorsDegree = 'BachelorsDegree',
  MastersDegree = 'MastersDegree',
  DoctoralDegree = 'DoctoralDegree',
  ProfessionalDegrees = 'ProfessionalDegrees',
}

export interface Lecturer {
  id: string
  created?: string
  updated?: string
  email: string
  firstName: string
  surname: string
  academicDegree: AcademicDegree
  // subjects: LecturerSubject[]
}

// interface LecturerSubject extends Subject {
//   schedule: Schedule
//   classroom: Classroom
//   lessons: Lesson[]
//   groups: Group[]
// }

export { AcademicDegree }
