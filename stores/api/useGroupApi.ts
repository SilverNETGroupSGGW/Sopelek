import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { GroupResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'
import type { GroupConflictResult } from '~/types/apiResults/groups/GroupConflictResult'

export const useGroupApi = defineStore('groupApi', {
  state: () => ({ }),
  actions: {
    async getGroups(): Promise<ApiResponse<GroupResult[]> | null> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<GroupResult[]>(Method.GET, 'Groups', null, null, true)
    },
    async getGroupsForSchedule(scheduleId: string): Promise<ApiResponse<GroupResult[]>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<GroupResult[]>(Method.GET, `Groups/schedule/${scheduleId}`, null, null, true)
    },
    async getGroup(groupId: string): Promise<ApiResponse<GroupResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<GroupResult>(Method.GET, `Groups/${groupId}`, null, null, true)
    },
    async createGroup(group: GroupResult): Promise<ApiResponse<GroupResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<GroupResult>(Method.POST, 'Groups', group, null, true)
    },
    async updateGroup(group: GroupResult): Promise<ApiResponse<GroupResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<GroupResult>(Method.PUT, 'Groups', group, null, true)
    },
    async deleteGroup(groupId: string): Promise<ApiResponse<void>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest(Method.DELETE, `Groups/${groupId}`, null, null, true)
    },
    async getGroupDependencies(groupId: string): Promise<ApiResponse<GroupConflictResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<GroupConflictResult>(Method.GET, `Groups/${groupId}/dependencies`, null, null, true)
    },
  },
})
