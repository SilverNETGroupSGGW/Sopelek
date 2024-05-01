import { AcademicDegree, DayOfWeek, DegreeOfStudy, StudyMode } from '~/types'

export default function useData() {
  const fieldOfStudies = [
    { department: 'Wydział Biologii i Biotechnologii', value: 'Biologia' },
    { department: 'Wydział Biologii i Biotechnologii', value: 'Biotechnologia' },
    { department: 'Wydział Rolnictwa i Ekologii', value: 'Ekologiczne rolnictwo i produkcja żywności' },
    { department: 'Wydział Rolnictwa i Ekologii', value: 'Ochrona środowiska' },
    { department: 'Wydział Rolnictwa i Ekologii', value: 'Rolnictwo' },
    { department: 'Wydział Rolnictwa i Ekologii', value: 'Zootechnika' },
    { department: 'Wydział Medycyny Weterynaryjnej', value: 'Weterynaria' },
    { department: 'Wydział Leśny', value: 'Forest Information Technology w języku angielskim' },
    { department: 'Wydział Leśny', value: 'Leśnictwo' },
    { department: 'Wydział Ogrodnictwa', value: 'Ogrodnictwo' },
    { department: 'Wydział Ogrodnictwa', value: 'Ogrodnictwo miejskie i arborystyka' },
    { department: 'Wydział Ogrodnictwa', value: 'Sustainable Horticulture w języku angielskim' },
    { department: 'Wydział Budownictwa i Inżynierii Środowiska', value: 'Budownictwo' },
    { department: 'Wydział Budownictwa i Inżynierii Środowiska', value: 'Inżynieria ekologiczna' },
    { department: 'Wydział Budownictwa i Inżynierii Środowiska', value: 'Inżynieria i gospodarka wodna' },
    { department: 'Wydział Budownictwa i Inżynierii Środowiska', value: 'Inżynieria środowiska' },
    { department: 'Wydział Budownictwa i Inżynierii Środowiska', value: 'Technologie energii odnawialnej' },
    { department: 'Wydział Technologii Drewna', value: 'Meblarstwo' },
    { department: 'Wydział Technologii Drewna', value: 'Technologia drewna' },
    { department: 'Wydział Hodowli, Bioinżynierii i Ochrony Zwierząt', value: 'Bioinżynieria zwierząt' },
    { department: 'Wydział Hodowli, Bioinżynierii i Ochrony Zwierząt', value: 'Hodowla i ochrona zwierząt towarzyszących i dzikich' },
    { department: 'Wydział Hodowli, Bioinżynierii i Ochrony Zwierząt', value: 'Inżynieria systemów biotechnicznych' },
    { department: 'Wydział Hodowli, Bioinżynierii i Ochrony Zwierząt', value: 'Zootechnika' },
    { department: 'Wydział Technologii Żywności', value: 'Bezpieczeństwo żywności' },
    { department: 'Wydział Technologii Żywności', value: 'Food Science – Technology and Nutrition' },
    { department: 'Wydział Technologii Żywności', value: 'Technologia żywności i żywienie człowieka' },
    { department: 'Wydział Technologii Żywności', value: 'Towaroznawstwo i marketing żywności' },
    { department: 'Wydział Żywienia Człowieka', value: 'Dietetyka' },
    { department: 'Wydział Żywienia Człowieka', value: 'Żywienie człowieka i ocena żywności' },
    { department: 'Wydział Inżynierii Produkcji', value: 'Inżynieria systemów biotechnicznych' },
    { department: 'Wydział Inżynierii Produkcji', value: 'Logistyka' },
    { department: 'Wydział Inżynierii Produkcji', value: 'Technologia biomedyczna' },
    { department: 'Wydział Inżynierii Produkcji', value: 'Zarządzanie i inżynieria produkcji' },
    { department: 'Wydział Ekonomiczny', value: 'Ekonomia' },
    { department: 'Wydział Ekonomiczny', value: 'Finanse i rachunkowość' },
    { department: 'Wydział Ekonomiczny', value: 'Zarządzanie' },
    { department: 'Wydział Ekonomiczny', value: 'Zarządzanie w języku angielskim' },
    { department: 'Wydział Socjologii i Pedagogiki', value: 'Gospodarka przestrzenna' },
    { department: 'Wydział Socjologii i Pedagogiki', value: 'Pedagogika' },
    { department: 'Wydział Socjologii i Pedagogiki', value: 'Socjologia' },
    { department: 'Wydział Zastosowań Informatyki i Matematyki', value: 'Informatyka' },
    { department: 'Wydział Zastosowań Informatyki i Matematyki', value: 'Informatyka i ekonometria' },
    { department: 'Wydział Zastosowań Informatyki i Matematyki', value: 'Turystyka i rekreacja' },
  ]

  const degrees = [
    { value: 'lic.', type: AcademicDegree.AssociateDegree },
    { value: 'inż.', type: AcademicDegree.BachelorsDegree },
    { value: 'mgr', type: AcademicDegree.MastersDegree },
    { value: 'dr', type: AcademicDegree.DoctoralDegree },
    { value: 'prof.', type: AcademicDegree.ProfessionalDegrees },
  ]

  const studiesModes = [
    { value: 'stacjonarne', type: StudyMode.FullTimeStudies },
    { value: 'niestacjonarne', type: StudyMode.PartTimeStudies },
    { value: 'inne', type: StudyMode.Unknown },
  ]

  const studiesDegrees = [
    { value: 'licencjackie/inżynierskie', type: DegreeOfStudy.BachelorsDegree },
    { value: 'magisterskie', type: DegreeOfStudy.MastersDegree },
    { value: 'doktorskie', type: DegreeOfStudy.DoctoralDegree },
    { value: 'podyplomowe', type: DegreeOfStudy.CertificatesAndDiplomas },
    { value: 'online', type: DegreeOfStudy.OnlineDegrees },
  ]

  const daysOfWeek = [
    { value: DayOfWeek.Monday, label: 'Poniedziałek', shortLabel: 'Pon' },
    { value: DayOfWeek.Tuesday, label: 'Wtorek', shortLabel: 'Wt' },
    { value: DayOfWeek.Wednesday, label: 'Środa', shortLabel: 'Śr' },
    { value: DayOfWeek.Thursday, label: 'Czwartek', shortLabel: 'Czw' },
    { value: DayOfWeek.Friday, label: 'Piątek', shortLabel: 'Pt' },
    { value: DayOfWeek.Saturday, label: 'Sobota', shortLabel: 'Sob' },
    { value: DayOfWeek.Sunday, label: 'Niedziela', shortLabel: 'Ndz' },
  ]

  return {
    fieldOfStudies,
    degrees,
    studiesModes,
    studiesDegrees,
    daysOfWeek,
  }
}
