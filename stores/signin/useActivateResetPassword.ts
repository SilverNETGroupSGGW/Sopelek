import { useToast } from 'vue-toastification'
import { useAccountApi } from '../api/useAccountApi'
import { useAuthNavigation } from './useAuthNavigation'

export const useActivateResetPasswrod = defineStore('activateResetPassword', {
  state: () => ({
    email: '',
    newPassword: '',
    code: '',
  }),
  actions: {
    async activateResetPassword() {
      const toast = useToast()
      const accountApi = useAccountApi()
      const authNavigation = useAuthNavigation()

      const result = await accountApi.resetPassword(this.email, this.newPassword, this.code)

      if (result.hasError) {
        toast.error(`Nie udało się zresetować hasła`)
        return Promise.reject(result.errorMessage)
      }

      this.clearForm()

      toast.success(`Hasło zostało zresetowane`)
      await authNavigation.navigateTo('signin')
    },
    async clearForm() {
      this.email = ''
      this.newPassword = ''
      this.code = ''
    },
  },
})
