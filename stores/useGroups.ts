import type { Group } from '~/types'
import type { GroupResult } from '~/types/apiResults'
import { useGroupApi } from './api/useGroupApi'

export const useGroups = defineStore('groups', {
  state: () => ({
    search: '',
    data: [] as Group[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'capacity', header: 'Pojemność' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async get(scheduleId: string) {
      const groupApi = useGroupApi()
      const response = await groupApi.getGroupsForSchedule(scheduleId)

      if (!response.hasError) {
        this.data = response.data!.sort((a, b) => a.name.localeCompare(b.name)) as Group[]
      }
    },
    async create(group: Group) {
      const groupApi = useGroupApi()
      const response = await groupApi.createGroup(group as GroupResult)

      if (!response.hasError) {
        this.data.push(response.data as Group)
      }
    },
    async update(group: Group) {
      const groupApi = useGroupApi()
      const response = await groupApi.updateGroup(group as GroupResult)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === response.data!.id)
        this.data[index] = response.data as Group
      }
    },
    async delete(group: Group) {
      const groupApi = useGroupApi()
      const response = await groupApi.deleteGroup(group.id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== group.id)
      }
    },
  },
})
