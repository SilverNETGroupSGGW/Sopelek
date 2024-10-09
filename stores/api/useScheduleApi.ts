import useApiRequest from '~/composables/useApiRequest'
import type { StudyMode } from '~/types'
import { RequestTypes as Method } from '~/types'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { DegreesOfStudies } from '~/types/apiResults/schedule/DegreesOfStudies'
import type { ScheduleExtendedResult } from '~/types/apiResults/ScheduleExtendedResult'

export const useScheduleApi = defineStore('scheduleApi', {
  state: () => ({ }),
  actions: {
    async getSchedules(): Promise<ApiResponse<ScheduleResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ScheduleResult[]>(Method.GET, 'Schedules', null, null, true, true)
    },
    async getSchedule(scheduleId: string): Promise<ApiResponse<ScheduleResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ScheduleResult>(Method.GET, `Schedules/${scheduleId}`, null, null, true, true)
    },
    async createSchedule(schedule: ScheduleResult): Promise<ApiResponse<ScheduleResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ScheduleResult>(Method.POST, 'Schedules', schedule, null, true)
    },
    async updateSchedule(schedule: ScheduleResult): Promise<ApiResponse<ScheduleResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ScheduleResult>(Method.PUT, 'Schedules', schedule, null, true)
    },
    async deleteSchedule(scheduleId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Schedules/${scheduleId}`, null, null, true)
    },
    async getScheduleExtended(scheduleId: string): Promise<ApiResponse<ScheduleExtendedResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<ScheduleExtendedResult>(Method.GET, `Schedules/${scheduleId}/extended`)
    },
    async getStudyModes(): Promise<ApiResponse<StudyMode>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<StudyMode>(Method.GET, 'Schedules/study-mode', null, null, false, false)
    },
    async getDegreesOfStudies(): Promise<ApiResponse<DegreesOfStudies>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<DegreesOfStudies>(Method.GET, 'Schedules/degrees-of-Studies', null, null, false, false)
    },
  },
})
