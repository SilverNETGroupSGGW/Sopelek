import { useToast } from 'vue-toastification'
import { useAccountApi } from '../api/useAccountApi'
import { useAuthNavigation } from './useAuthNavigation'

export const useSignUp = defineStore('signUp', {
  state: () => ({
    email: '',
    password: '',
    confirmPassword: '',
  }),
  actions: {
    async handleSignUp() {
      const toast = useToast()
      const authNavigation = useAuthNavigation()
      const accountApi = useAccountApi()

      if (this.password !== this.confirmPassword) {
        const msg = `Pola hasło i potwierdź hasło muszą być takie same`
        this.password = ''
        this.confirmPassword = ''
        toast.error(msg)
        return Promise.reject(new Error(msg))
      }

      authNavigation.isSubmitting = true
      const result = await accountApi.registerAccount(this.email, this.password)
      authNavigation.isSubmitting = false

      if (result.hasError) {
        this.password = ''
        this.confirmPassword = ''
        toast.error(`Próba rejestracji nie powiodła się`)
        return Promise.reject(new Error(result.errorMessage))
      }

      this.clearForm()

      toast.success(`Utworzono konto pomyślnie. Sprawdź maila w celu aktywacji konta`)
      await authNavigation.navigateTo('signin')
    },
    async clearForm() {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    },
  },
})
