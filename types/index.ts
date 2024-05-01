import { AcademicDegree } from './Lecturer'
import type { BaseResponse } from './BaseResponse'
import type { Classroom } from './Classroom'
import type { Subject, SubjectConflict, SubjectConflictItem } from './Subject'
import { DayOfWeek } from './Subject'
import type { Schedule } from './Schedule'
import { DegreeOfStudy, StudyMode } from './Schedule'
import type { Group } from './Group'
import type { Lecturer } from './Lecturer'
import type { Lesson } from './Lesson'
import type { StudyProgram } from './StudyProgram'
import type { Account } from './Account'
import type { Organization } from './Organization'
import type { Tenant } from './Tenant'
import type { CreateUser, User } from './User'
import type { SubjectType } from './SubjectType'

export type {
  Account,
  Subject,
  Lecturer,
  Classroom,
  Schedule,
  Lesson,
  Group,
  SubjectConflict,
  SubjectConflictItem,
  BaseResponse,
  StudyProgram,
  Organization,
  Tenant,
  User,
  CreateUser,
  SubjectType,
}

export { AcademicDegree, DayOfWeek, StudyMode, DegreeOfStudy }
