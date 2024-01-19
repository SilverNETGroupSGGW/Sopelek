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
        key: 'email',
        header: 'Email',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get() {
      const data = await $fetch<Lecturer[]>('lecturers', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'GET',
      })

      this.data = data.sort((a, b) => a.surname.localeCompare(b.surname))
    },
    async create(lecturer: Lecturer) {
      const { degrees } = useData()
      lecturer.academicDegree = (degrees.find(degree => degree.value === lecturer.academicDegree))!.type
      const data = await $fetch<Lecturer>('lecturers', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        body: JSON.stringify(lecturer),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data)
    },
    async update(lecturer: Lecturer) {
      const data = await $fetch<Lecturer>('lecturers', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
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
      await $fetch(`lecturers/${lecturer.id}`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== lecturer.id)
    },
  },
})
