import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useScheduleApi = defineStore('scheduleApi', {
  state: () => ({
  }),
  actions: {
    async getSchedules(): Promise<ApiResponse<ScheduleResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ScheduleResult[]>(Method.GET, 'Schedules')
      return result
    },
    async getSchedule(scheduleId: string): Promise<ApiResponse<ScheduleResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ScheduleResult>(Method.GET, `Schedules/${scheduleId}`)
      return result
    },
    async createSchedule(schedule: ScheduleResult): Promise<ApiResponse<ScheduleResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ScheduleResult>(Method.POST, 'Schedules', schedule, null, true)
      return result
    },
    async updateSchedule(schedule: ScheduleResult): Promise<ApiResponse<ScheduleResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ScheduleResult>(Method.PUT, 'Schedules', schedule, null, true)
      return result
    },
    async deleteSchedule(scheduleId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Schedules/${scheduleId}`, null, null, true)
    },
    async getScheduleExtended(scheduleId: string): Promise<ApiResponse<ScheduleResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ScheduleResult>(Method.GET, `Schedules/${scheduleId}/extended`)
      return result
    },
  },
})
