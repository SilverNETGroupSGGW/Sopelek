enum AcademicDegree {
  AssociateDegree = 'AssociateDegree',
  BachelorsDegree = 'BachelorsDegree',
  MastersDegree = 'MastersDegree',
  DoctoralDegree = 'DoctoralDegree',
  ProfessionalDegrees = 'ProfessionalDegrees',
}

export interface Lecturer {
  id: string
  created: string
  updated: string
  firstName: string
  surname: string
  academicDegree: string
  email: string
  institute: string
}

export { AcademicDegree }
