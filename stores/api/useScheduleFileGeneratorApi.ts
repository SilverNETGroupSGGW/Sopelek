import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useScheduleFileGeneratorApi = defineStore('scheduleFileGeneratorApi', {
  state: () => ({ }),
  actions: {
    async generateScheduleFile(scheduleId: string): Promise<ApiResponse<Blob>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<Blob>(Method.POST, `ScheduleGenerator/generate/${scheduleId}`, null, null, true, false)
    },
  },
})
