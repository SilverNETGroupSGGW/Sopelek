import { useToast } from 'vue-toastification'
import type { OrganizationResult } from '~/types/apiResults'
import { useOrganizationApi } from '../api/useOrganizationsApi'

export const useOrganizationSearch = defineStore('organizationSearch', {
  state: () => ({
    selectedOrganization: null as OrganizationResult | null,
    organizations: [] as OrganizationResult[],
  }),
  actions: {
    async getOrganizationsBySearchPhrase(searchPhrase: string) {
      const organizationApi = useOrganizationApi()

      const response = await organizationApi.getOrganizations()

      if (response.status === 200 && response.data) {
        this.organizations = response.data
      }
      else {
        const toast = useToast()
        toast.error('Coś poszło nie tak, skontaktuj się z administratorem')
      }
    },
  },
})
