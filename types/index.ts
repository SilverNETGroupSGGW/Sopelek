import { AcademicDegree } from './Lecturer'
import type { BaseResponse } from './BaseResponse'
import type { Classroom } from './Classroom'
import type { Subject, SubjectConflict, SubjectConflictItem } from './Subject'
import { DayOfWeek, SubjectType } from './Subject'
import type { Schedule } from './Schedule'
import { DegreeOfStudy, StudyMode } from './Schedule'
import type { Group } from './Group'
import type { Lecturer } from './Lecturer'; import type { Lesson } from './Lesson'
import type { StudyProgram } from './StudyProgram'
import type { Account } from './Account'
import type { AccountTokens } from './AccountTokens'
import type { Organization } from './Organization'

export type {
    Account,
    AccountTokens,
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
    Organization
}

export { AcademicDegree, DayOfWeek, SubjectType, StudyMode, DegreeOfStudy }
