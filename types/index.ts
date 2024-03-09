import { DayOfWeek, type Subject, type SubjectConflict, type SubjectConflictItem, SubjectType } from './Subject'
import type { Lecturer } from './Lecturer'
import type { Classroom } from './Classroom'
import type { Schedule } from './Schedule'
import type { Lesson } from './Lesson'
import type { Group } from './Group'
import { DegreeOfStudy, StudyMode } from './Schedule'
import { AcademicDegree } from './Lecturer'
import type { BaseResponse } from './BaseResponse'

export type { Subject, Lecturer, Classroom, Schedule, Lesson, Group, SubjectConflict, SubjectConflictItem, BaseResponse }
export { AcademicDegree, DayOfWeek, SubjectType, StudyMode, DegreeOfStudy }
