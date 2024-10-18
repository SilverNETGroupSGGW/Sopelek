import { useToast } from 'vue-toastification'
import { useAccountApi } from '../api/useAccountApi'

export const useActivateAccount = defineStore('activateAccount', {
  actions: {
    async handleAccountActivation(email: string, code: string) {
      const toast = useToast()
      const accountApi = useAccountApi()

      const result = await accountApi.activateAccount(email, code)

      if (result.hasError) {
        toast.error(`Nie udało się aktywować konta. ${result.errorMessage}`)
        return
      }

      toast.success(`Aktwowano konto pomyślnie`)
    },
  },
})
