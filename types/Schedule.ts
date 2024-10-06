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
  id: string
  created?: string
  updated?: string
  name: string

  year?: number
  studyProgramId?: string | null
  groups?: Group[]
  subjects?: Subject[]

  /* internal */
  isDownloading?: boolean
}
