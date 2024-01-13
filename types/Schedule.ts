import type { Group } from './Group'
import type { Subject } from './Subject'

export enum DegreeOfStudy {
  BachelorsDegree = 'BachelorsDegree',
  MastersDegree = 'MastersDegree',
  DoctoralDegree = 'DoctoralDegree',
  CertificatesAndDiplomas = 'CertificatesAndDiplomas',
  OnlineDegrees = 'OnlineDegrees',
}

export enum StudyMode {
  FullTimeStudies = 'FullTimeStudies',
  PartTimeStudies = 'PartTimeStudies',
  Unknown = 'Unknown',
}

export interface Schedule {
  created?: string
  degreeOfStudy: DegreeOfStudy
  faculty: string
  fieldOfStudy: string
  groups: Group[]
  id: string
  name: string
  semester: number
  startDate: string
  studyMode: StudyMode
  subjects: Subject[]
  updated?: string
  year: number
}
