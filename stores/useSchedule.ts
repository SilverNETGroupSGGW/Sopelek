import type { BaseResponse, Schedule } from '~/types'

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
      const runtimeConfig = useRuntimeConfig()
      const { data } = await useFetch<BaseResponse<Schedule[]>>('schedules', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
      })

      // Update data.startDate to match YYYY-MM-DD format
      data.value!.data.forEach((schedule) => {
        if (schedule.startDate)
          schedule.startDate = schedule.startDate.split('T')[0]

        schedule.isDownloading = false
      })

      this.data = data.value!.data
    },
    async create(schedule: Schedule) {
      const runtimeConfig = useRuntimeConfig()

      const { studiesModes, studiesDegrees } = useData()
      schedule.studyMode = (studiesModes.find(mode => mode.value === schedule.studyMode))!.type
      schedule.degreeOfStudy = (studiesDegrees.find(degree => degree.value === schedule.degreeOfStudy))!.type

      const data = await $fetch<BaseResponse<Schedule>>('schedules', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(schedule),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data)
    },
    async update(schedule: Schedule) {
      const runtimeConfig = useRuntimeConfig()

      const { studiesModes, studiesDegrees } = useData()
      schedule.studyMode = (studiesModes.find(mode => mode.value === schedule.studyMode))!.type
      schedule.degreeOfStudy = (studiesDegrees.find(degree => degree.value === schedule.degreeOfStudy))!.type

      const data = await $fetch<BaseResponse<Schedule>>('schedules', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(schedule),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(schedule: Schedule) {
      const runtimeConfig = useRuntimeConfig()

      await $fetch<Schedule>(`schedules/${schedule.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== schedule.id)
    },
    async download(schedule: Schedule) {
      const runtimeConfig = useRuntimeConfig()
      schedule.isDownloading = true

      const data = await $fetch<Blob>(`schedulegenerator/generate/${schedule.id}`, {
        baseURL: runtimeConfig.public.baseURL,
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

      schedule.isDownloading = false
    },
  },
})
