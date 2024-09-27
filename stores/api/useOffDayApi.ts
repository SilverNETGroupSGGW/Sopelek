import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { OffDayResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useOffDaysApi = defineStore('offDayApi', {
  state: () => ({ }),
  actions: {
    async getOffDays(): Promise<ApiResponse<OffDayResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OffDayResult[]>(Method.GET, 'OffDay', null, null, true)
    },
    async getOffDay(offDayId: string): Promise<ApiResponse<OffDayResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OffDayResult>(Method.GET, `OffDay/${offDayId}`, null, null, true)
    },
    async createOffDay(offDayId: OffDayResult): Promise<ApiResponse<OffDayResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OffDayResult>(Method.POST, 'OffDay', offDayId, null, true)
    },
    async updateOffDay(offDayId: OffDayResult): Promise<ApiResponse<OffDayResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<OffDayResult>(Method.PUT, 'OffDay', offDayId, null, true)
    },
    async deleteOffDay(offDayId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `OffDay/${offDayId}`, null, null, true)
    },
  },
})
