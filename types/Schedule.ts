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
  id: string
  groups: Group[]
  name: string
  studyProgramId: string | null
  subjects: Subject[]
  updated?: string
  year: number

  /* internal */
  isDownloading?: boolean
}
