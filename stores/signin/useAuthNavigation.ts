export type AuthMode =
  'signin' |
  'signup' |
  'forgotPassword' |
  'forgotPasswordConfirm' |
  'activateResetPassword'

export const useAuthNavigation = defineStore('authNavigation', {
  state: () => ({
    mode: 'signin' as AuthMode,
    isSubmitting: false,
  }),
  getters: {
    isSignInMode: state => state.mode === 'signin',
    isSignUpMode: state => state.mode === 'signup',
    isForgotPasswordMode: state => state.mode === 'forgotPassword',
    isForgotPasswordConfirmMode: state => state.mode === 'forgotPasswordConfirm',
    isActivateResetPasswordMode: state => state.mode === 'activateResetPassword',
  },
  actions: {
    async navigateTo(mode: AuthMode) {
      this.mode = mode as AuthMode
    },
    async navigateToByString(modeString: string) {
      switch (modeString) {
        case 'signin':
          this.mode = 'signin'
          break
        case 'signup':
          this.mode = 'signup'
          break
        case 'forgotPassword':
          this.mode = 'forgotPassword'
          break
        case 'forgotPasswordConfirm':
          this.mode = 'forgotPasswordConfirm'
          break
        case 'activateResetPassword':
          this.mode = 'activateResetPassword'
          break
        default:
          this.mode = 'signin'
          break
      }
    },
  },
})
