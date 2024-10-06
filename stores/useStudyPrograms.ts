import type { StudyProgram } from '~/types'
import type { StudyProgramResult } from '~/types/apiResults'
import { useStudyProgramApi } from './api/useStudyProgramApi'

export const useStudyPrograms = defineStore('studyPrograms', {
  state: () => ({
    search: '',
    data: [] as StudyProgram[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get() {
      const studyProgramApi = useStudyProgramApi()
      const response = await studyProgramApi.getStudyPrograms()

      if (!response.hasError) {
        this.data = response.data!
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(sp => sp as StudyProgram)
      }
    },
    async create(studyProgram: StudyProgram) {
      const studyProgramApi = useStudyProgramApi()
      const response = await studyProgramApi.createStudyProgram(studyProgram as StudyProgramResult)

      if (!response.hasError) {
        this.data.push(response.data!)
      }
    },
    async update(studyProgram: StudyProgram) {
      const studyProgramApi = useStudyProgramApi()
      const response = await studyProgramApi.updateStudyProgram(studyProgram as StudyProgramResult)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === studyProgram.id)
        this.data[index] = response.data!
      }
    },
    async delete(studyProgram: StudyProgram) {
      const studyProgramApi = useStudyProgramApi()
      const response = await studyProgramApi.deleteStudyProgram(studyProgram.id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== studyProgram.id)
      }
    },
  },
})
