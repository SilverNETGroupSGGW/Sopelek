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
      const runtimeConfig = useRuntimeConfig()
      const { data } = await useFetch<Subject[]>(`subjects/schedule/${scheduleId}/extended`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value!.sort((a, b) => {
        if (a.dayOfWeek === b.dayOfWeek)
          return a.startTime!.localeCompare(b.startTime!)

        else
          return a.dayOfWeek!.localeCompare(b.dayOfWeek!)
      })
    },
    async create(subject: Subject) {
      try {
        const runtimeConfig = useRuntimeConfig()
        const data = await $fetch<Subject>('subjects', {
          baseURL: runtimeConfig.public.baseURL,
          method: 'POST',
          body: JSON.stringify(subject),
          headers: {
            Authorization: `Bearer ${useCookie('accessToken').value}`,
          },
        })

        this.data.push(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    async update(subject: Subject) {
      try {
        const runtimeConfig = useRuntimeConfig()
        const data = await $fetch<Subject>('subjects', {
          baseURL: runtimeConfig.public.baseURL,
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
        return Promise.reject(error)
      }
    },
    async delete(id: string) {
      const runtimeConfig = useRuntimeConfig()
      try {
        await $fetch<Subject>(`subjects/${id}`, {
          baseURL: runtimeConfig.public.baseURL,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${useCookie('accessToken').value}`,
          },
        })
      }
      catch (error) {
        return Promise.reject(error)
      }

      this.data = this.data.filter(l => l.id !== id)
    },
  },
})
