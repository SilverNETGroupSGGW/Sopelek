import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useScheduleFileGeneratorApi = defineStore('scheduleFileGeneratorApi', {
  state: () => ({
  }),
  actions: {
    async generateScheduleFile(scheduleId: string): Promise<ApiResponse<Blob> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<Blob>(Method.GET, `ScheduleGenerator/generate/${scheduleId}`)
      return result
    },
  },
})
