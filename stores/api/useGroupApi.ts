import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { GroupResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useGroupApi = defineStore('groupApi', {
  state: () => ({
  }),
  actions: {
    async getGroups(): Promise<ApiResponse<GroupResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<GroupResult[]>(Method.GET, 'Groups')
      return result
    },
    async getGroupsForSchedule(scheduleId: string): Promise<ApiResponse<GroupResult[]> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<GroupResult[]>(Method.GET, `Groups/schedule/${scheduleId}`)
      return result
    },
    async getGroup(groupId: string): Promise<ApiResponse<GroupResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<GroupResult>(Method.GET, `Groups/${groupId}`)
      return result
    },
    async createGroup(group: GroupResult): Promise<ApiResponse<GroupResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<GroupResult>(Method.POST, 'Groups', group)
      return result
    },
    async updateGroup(group: GroupResult): Promise<ApiResponse<GroupResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<GroupResult>(Method.PUT, 'Groups', group)
      return result
    },
    async deleteGroup(groupId: string): Promise<void> {
      const { makeRequest } = useApiRequest()
      await makeRequest(Method.DELETE, `Groups/${groupId}`)
    },
  },
})
