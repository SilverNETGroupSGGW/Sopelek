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
  name: string
  studyProgramId: string | null
  updated?: string
  year: number

  /* internal */
  isDownloading?: boolean
}
