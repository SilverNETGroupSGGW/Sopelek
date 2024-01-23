import type { Group } from '~/types'

export const useGroups = defineStore('groups', {
  state: () => ({
    search: '',
    data: [] as Group[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
      },
      {
        key: 'capacity',
        header: 'Pojemność',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get(scheduleId: string) {
      const { data } = await useFetch<Group[]>(`groups/schedule/${scheduleId}`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'GET',
      })

      this.data = data.value!.sort((a, b) => a.name.localeCompare(b.name))
    },
    async create(group: Group) {
      const data = await $fetch<Group>('groups', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        body: JSON.stringify(group),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data)
    },
    async update(group: Group) {
      const data = await $fetch<Group>('groups', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'PUT',
        body: JSON.stringify(group),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.id)
      this.data[index] = data
    },
    async delete(group: Group) {
      await $fetch<Group>(`groups/${group.id}`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== group.id)
    },
  },
})
