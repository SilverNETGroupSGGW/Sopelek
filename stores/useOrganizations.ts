import type { Organization } from '~/types'
import { useOrganizationApi } from './api/useOrganizationsApi'

export const useOrganizations = defineStore('organizations', {
  state: () => ({
    search: '',
    data: [] as Organization[],
    columns: [
      { key: 'name', header: 'Nazwa' },
      { key: 'actions', header: 'Akcje' },
    ],
  }),
  actions: {
    async getAll() {
      const organizationApi = useOrganizationApi()
      const response = await organizationApi.getOrganizations()

      if (!response.hasError) {
        this.data = response.data!.sort((a, b) => a.name.localeCompare(b.name)) as Organization[]
      }
    },
    async create(organization: Organization) {
      const organizationApi = useOrganizationApi()
      const response = await organizationApi.createOrganization(organization as Organization)

      if (!response.hasError) {
        this.data.push(response.data as Organization)
      }
    },
    async update(organization: Organization) {
      const organizationApi = useOrganizationApi()
      const response = await organizationApi.updateOrganization(organization as Organization)

      if (!response.hasError) {
        const index = this.data.findIndex(l => l.id === response.data!.id)
        this.data[index] = response.data as Organization
      }
    },
    async delete(organization: Organization) {
      const organizationApi = useOrganizationApi()
      const response = await organizationApi.deleteOrganization(organization.id)

      if (!response.hasError) {
        this.data = this.data.filter(l => l.id !== organization.id)
      }
    },
  },
})
