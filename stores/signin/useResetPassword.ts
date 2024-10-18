import { useToast } from 'vue-toastification'
import { useAccountApi } from '../api/useAccountApi'
import { useAuthNavigation } from './useAuthNavigation'

export const useResetPasswrod = defineStore('resetPassword', {
  state: () => ({
    email: '',
  }),
  actions: {
    async resetPassword() {
      const toast = useToast()
      const accountApi = useAccountApi()
      const authNavigation = useAuthNavigation()

      const result = await accountApi.sendPasswordResetEmail(this.email)

      if (result.hasError) {
        toast.error(`Nie udało się wysłać maila z kodem do resetowania hasła`)
        return Promise.reject(result.errorMessage)
      }

      this.clearForm()

      toast.success(`Email z kodem do resetowania hasła został wysłany`)
      await authNavigation.navigateTo('signin')
    },
    async clearForm() {
      this.email = ''
    },
  },
})
