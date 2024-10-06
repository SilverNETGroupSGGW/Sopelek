import type { Schedule } from '~/types'
import type { ScheduleResult } from '~/types/apiResults'
import { useScheduleApi } from './api/useScheduleApi'
import { useScheduleFileGeneratorApi } from './api/useScheduleFileGeneratorApi'

export const useSchedule = defineStore('schedule', {
  state: () => ({
    search: '',
    data: [] as Schedule[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get() {
      const scheduleApi = useScheduleApi()
      const response = await scheduleApi.getSchedules()

      if (!response.hasError) {
        this.data = response.data as Schedule[]
      }
    },
    async create(schedule: Schedule) {
      const scheduleApi = useScheduleApi()
      const response = await scheduleApi.createSchedule(schedule as ScheduleResult)

      if (!response.hasError) {
        this.data.push(response.data as Schedule)
      }
    },
    async update(schedule: Schedule) {
      const scheduleApi = useScheduleApi()
      const response = await scheduleApi.updateSchedule(schedule as ScheduleResult)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === schedule.id)
        this.data[index] = response.data as Schedule
      }
    },
    async delete(schedule: Schedule) {
      const scheduleApi = useScheduleApi()
      const response = await scheduleApi.deleteSchedule(schedule.id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== schedule.id)
      }
    },
    async download(schedule: Schedule) {
      const scheduleGeneratorApi = useScheduleFileGeneratorApi()
      const response = await scheduleGeneratorApi.generateScheduleFile(schedule.id)

      if (!response.hasError) {
        const url = window.URL.createObjectURL(response.data as Blob)
        const { downloadFile } = useFileDownloader()
        downloadFile(url, `${schedule.name}.xlsx`)
      }

      schedule.isDownloading = false
    },
  },
})
