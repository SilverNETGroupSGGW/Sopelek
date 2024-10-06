import type { Lecturer } from '~/types'
import type { LecturerResult } from '~/types/apiResults'
import { useLecturerApi } from './api/useLecturerApi'

export const useLecturers = defineStore('lecturers', {
  state: () => ({
    search: '',
    data: [] as Lecturer[],
    columns: [
      { key: 'firstName', header: 'Imię i nazwisko' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get() {
      const lecturerApi = useLecturerApi()
      const response = await lecturerApi.getLecturers()

      if (!response.hasError) {
        this.data = response.data!
          .sort((a, b) => a.surname.localeCompare(b.surname))
          .map(l => l as Lecturer)
      }
    },
    async create(lecturer: Lecturer) {
      const lecturerApi = useLecturerApi()
      const response = await lecturerApi.createLecturer(lecturer as LecturerResult)

      if (!response.hasError) {
        this.data.push(response.data as Lecturer)
      }
    },
    async update(lecturer: Lecturer) {
      const lecturerApi = useLecturerApi()
      const response = await lecturerApi.updateLecturer(lecturer as LecturerResult)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === response.data!.id)
        this.data[index] = response.data as Lecturer
      }
    },
    async delete(lecturer: Lecturer) {
      const lecturerApi = useLecturerApi()
      const response = await lecturerApi.deleteLecturer(lecturer.id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== lecturer.id)
      }
    },
  },
})
