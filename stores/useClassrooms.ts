import type { Classroom } from '~/types'

export const useClassrooms = defineStore('classrooms', {
  state: () => ({
    search: '',
    data: [] as Classroom[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
      },
      {
        key: 'floor',
        header: 'Piętro',
      },
      {
        key: 'building',
        header: 'Budynek',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get() {
      this.data = await $fetch<Classroom[]>('classrooms', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'GET',
      })
    },
    async create(classroom: Classroom) {
      const data = await $fetch<Classroom>('classrooms', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        body: JSON.stringify(classroom),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data)
    },
    async update(classroom: Classroom) {
      const data = await $fetch<Classroom>('classrooms', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'PUT',
        body: JSON.stringify(classroom),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.id)
      this.data[index] = data
    },
    async delete(classroom: Classroom) {
      await $fetch(`classrooms/${classroom.id}`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== classroom.id)
    },
  },
})
