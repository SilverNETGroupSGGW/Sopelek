import type { Subject, SubjectConflict } from '~/types'

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
      const { data } = await useFetch<Subject[]>(`subjects/schedule/${scheduleId}/extended`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'GET',
      })

      this.data = data.value!.sort((a, b) => {
        if (a.dayOfWeek === b.dayOfWeek)
          return a.startTime!.localeCompare(b.startTime!)

        else
          return a.dayOfWeek!.localeCompare(b.dayOfWeek!)
      })
    },
    async create(subject: Subject) {
      const data = await $fetch<Subject>('subjects', {
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
        const data = await $fetch<Subject>('subjects', {
          baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
          method: subject.id === 'create' ? 'POST' : 'PUT',
          body: JSON.stringify(subject),
          headers: {
            Authorization: `Bearer ${useCookie('accessToken').value}`,
          },
        })

        const index = this.data.findIndex(l => l.id === data.id)
        this.data[index] = data

        return data
      }
      catch (error) {
      }
    },
    async delete(id: string) {
      await $fetch<Subject>(`subjects/${id}`, {
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
