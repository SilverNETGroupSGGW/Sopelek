import type { Schedule } from '~/types'

export const useSchedule = defineStore('schedule', {
  state: () => ({
    search: '',
    data: [] as Schedule[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
      },
      {
        key: 'info',
        header: 'Informacje',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get() {
      const data = await $fetch<Schedule[]>('schedules', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'GET',
      })

      this.data = data
    },
    async create(schedule: Schedule) {
      const data = await $fetch<Schedule>('schedules', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        body: JSON.stringify(schedule),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data)
    },
    async update(schedule: Schedule) {
      const data = await $fetch<Schedule>('schedules', {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'PUT',
        body: JSON.stringify(schedule),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.id)
      this.data[index] = data
    },
    async delete(schedule: Schedule) {
      await $fetch<Schedule>(`schedules/${schedule.id}`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== schedule.id)
    },
    async download(schedule: Schedule) {
      const data = await $fetch<Blob>(`ScheduleGenerator/generate/${schedule.id}`, {
        baseURL: 'https://kampus-sggw-api.azurewebsites.net/api',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${schedule.name}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
})
