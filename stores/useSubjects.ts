import type { DayOfWeek, Subject, SubjectConflict } from '~/types'

export const useSubjects = defineStore('subjects', {
  state: () => ({
    search: '',
    data: [] as Subject[],
    conflicts: [] as SubjectConflict[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
      },
      {
        key: 'lecturers',
        header: 'Prowadzący',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get(scheduleId: string) {
      this.data = await $fetch<Subject[]>(`Subjects/schedule/${scheduleId}/extended`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'GET',
      })
    },
    async getConflicts(scheduleId: string, dayOfWeek: DayOfWeek) {
      this.conflicts = await $fetch<SubjectConflict[]>(`Subjects/check-conflict`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        body: JSON.stringify({
          scheduleId,
          groups: [...new Set(this.data.map(subject => subject.groupsIds).flat())],
          dayOfWeek,
        }),
      })
    },
    async create(subject: Subject) {
      const data = await $fetch<Subject>('Subjects', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        body: JSON.stringify(subject),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data)
    },
    async update(subject: Subject) {
      try {
        const data = await $fetch<Subject>('Subjects', {
          baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
          method: subject.id === 'create' ? 'POST' : 'PUT',
          body: JSON.stringify(subject),
          headers: {
            Authorization: `Bearer ${useCookie('accessToken').value}`,
          },
        })

        const index = this.data.findIndex(l => l.id === data.id)
        this.data[index] = data
      }
      catch (error) {
      }
    },
    async delete(id: string) {
      await $fetch<Subject>(`Subjects/${id}`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== id)
    },
  },
})
