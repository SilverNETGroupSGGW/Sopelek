import { useToast } from 'vue-toastification'
import { useAuthNavigation } from './useAuthNavigation'

export const useSignIn = defineStore('signIn', {
  state: () => ({
    email: '',
    password: '',
  }),
  actions: {
    async handleSignIn() {
      const toast = useToast()
      const session = useSession()
      const authNavigation = useAuthNavigation()

      authNavigation.isSubmitting = true
      const result = await session.createSession(this.email, this.password)
      authNavigation.isSubmitting = false

      if (result.status === 'not created') {
        if (result.notCreatedReason === 'Email not confirmed') {
          toast.error(`Konto nie zostało aktywowane. Sprawdź maila w celu aktywacji konta`)
          return
        }

        toast.error(`Próba logowania nie powiodła się`)
        this.password = ''
        return
      }

      await this.clearForm()

      toast.success(`Zalogowano pomyślnie`)
      await navigateTo('/portal/')
    },
    async clearForm() {
      this.email = ''
      this.password = ''
    },
  },
})
