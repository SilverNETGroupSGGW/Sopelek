import type { Lecturer } from '~/types'

export const useLecturers = defineStore('lecturers', {
  state: () => ({
    search: '',
    data: [] as Lecturer[],
    columns: [
      {
        key: 'firstName',
        header: 'Imię i nazwisko',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get() {
      const runtimeConfig = useRuntimeConfig()
      const { data } = await useFetch<Lecturer[]>('lecturers', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value!.sort((a, b) => a.surname.localeCompare(b.surname))
    },
    async create(lecturer: Lecturer) {
      const runtimeConfig = useRuntimeConfig()
      // const { degrees } = useData()
      // lecturer.academicDegree = (degrees.find(degree => degree.value === lecturer.academicDegree))!.type
      const data = await $fetch<Lecturer>('lecturers', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(lecturer),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data)
    },
    async update(lecturer: Lecturer) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<Lecturer>('lecturers', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(lecturer),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.id)
      this.data[index] = data
    },
    async delete(lecturer: Lecturer) {
      const runtimeConfig = useRuntimeConfig()
      await $fetch(`lecturers/${lecturer.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== lecturer.id)
    },
  },
})
