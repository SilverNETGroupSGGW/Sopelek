import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ScheduleResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { DegreesOfStudies } from '~/types/apiResults/DegreesOfStudies'
import type { ScheduleExtendedResult } from '~/types/apiResults/ScheduleExtendedResult'
import type { StudyMode } from '~/types/StudyMode'

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
    async getScheduleExtended(scheduleId: string): Promise<ApiResponse<ScheduleExtendedResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<ScheduleExtendedResult>(Method.GET, `Schedules/${scheduleId}/extended`)
      return result
    },
    async getStudyModes(): Promise<ApiResponse<StudyMode> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<StudyMode>(Method.GET, 'Schedules/study-mode', null, null, false, false)
      return result
    },
    async getDegreesOfStudies(): Promise<ApiResponse<DegreesOfStudies> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<DegreesOfStudies>(Method.GET, 'Schedules/degrees-of-Studies', null, null, false, false)
      return result
    },
  },
})
