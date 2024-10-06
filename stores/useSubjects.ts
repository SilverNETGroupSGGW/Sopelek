import type { Subject, SubjectConflict } from '~/types'
import type { SubjectResult } from '~/types/apiResults'
import { useSubjectApi } from './api/useSubjectApi'

export const useSubjects = defineStore('subjects', {
  state: () => ({
    search: '',
    data: [] as Subject[],
    conflicts: [] as SubjectConflict[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'lecturers', header: 'Prowadzący' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get(scheduleId: string) {
      const subjectApi = useSubjectApi()
      const response = await subjectApi.getSubjectsForSchedule(scheduleId)

      if (!response.hasError) {
        this.data = response.data!.sort((a, b) => {
          if (a.dayOfWeek === b.dayOfWeek)
            return a.startTime!.localeCompare(b.startTime!)
          else
            return a.dayOfWeek!.localeCompare(b.dayOfWeek!)
        }) as Subject[]
      }
    },
    async create(subject: Subject) {
      const subjectApi = useSubjectApi()
      const response = await subjectApi.createSubject(subject as SubjectResult)

      if (!response.hasError) {
        this.data.push(response.data! as Subject)
      }
      else {
        return Promise.reject(response.errorMessage)
      }
    },
    async update(subject: Subject) {
      const subjectApi = useSubjectApi()
      const response = await subjectApi.updateSubject(subject as SubjectResult)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === subject.id)
        this.data[index] = response.data! as Subject
      }
      else {
        return Promise.reject(response.errorMessage)
      }
    },
    async delete(id: string) {
      const subjectApi = useSubjectApi()
      const response = await subjectApi.deleteSubject(id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== id)
      }
      else {
        return Promise.reject(response.errorMessage)
      }
    },
  },
})
