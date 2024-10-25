import { jwtDecode } from 'jwt-decode'
import type { CloseSessionResult } from '~/types/session/CloseSessionResult'
import type { CreateSessionResult } from '~/types/session/CreateSessionResult'
import type { RefreshSessionResult } from '~/types/session/RefreshSessionResult'
import { useAuthApi } from './api/useAuthApi'

export const useSession = defineStore('session', {
  state: () => ({}),
  getters: {
    accessToken: () => useCookie('accessToken').value,
    refreshToken: () => useCookie('refreshToken').value,
    accessTokenExpiresIn: (): Date | null => {
      return useCookie('accessToken').value
        ? new Date(jwtDecode(useCookie('accessToken').value!).exp! * 1000)
        : null
    },
    refreshTokenExpiresIn: (): Date | null => {
      return useCookie('refreshToken').value
        ? new Date(jwtDecode(useCookie('refreshToken').value!).exp! * 1000)
        : null
    },
    isSessionActive: (): boolean => {
      if (!useCookie('accessToken').value || !useCookie('refreshToken').value) {
        return false
      }

      const refreshTokenExpDate = new Date(jwtDecode(useCookie('refreshToken').value!).exp! * 1000)
      if (refreshTokenExpDate! < new Date()) {
        return false
      }

      const expDate = new Date(jwtDecode(useCookie('accessToken').value!).exp! * 1000)
      if (expDate! < new Date()) {
        return false
      }

      return true
    },
    lastSessionRefresh: (): Date | null => {
      if (!useCookie('accessToken').value || !useCookie('refreshToken').value) {
        return null
      }

      return new Date(jwtDecode(useCookie('accessToken').value!).nbf! * 1000)
    },

  },
  actions: {
    async createSession(email: string, password: string): Promise<CreateSessionResult> {
      const result: CreateSessionResult = {
        email,
        date: new Date(),
      }

      const tokensApi = useAuthApi()
      const response = await tokensApi.getTokensAsync(email, password)

      if (!response.hasError) {
        useCookie('accessToken').value = response.data!.accessToken
        useCookie('refreshToken').value = response.data!.refreshToken

        result.status = 'created'
        result.accessToken = response.data!.accessToken
        result.refreshToken = response.data!.refreshToken
      }
      else {
        result.status = 'not created'
        result.notCreatedReason = response.data! as string
      }

      return result
    },
    async refreshSession(): Promise<RefreshSessionResult> {
      const result: RefreshSessionResult = {
        date: new Date(),
      }

      if (this.isSessionActive === false) {
        result.status = 'no session to refresh'
        return result
      }

      if (await this.isRefreshTokenExpired()) {
        result.status = 'refresh token expired'
        return result
      }

      const tokensApi = useAuthApi()
      const response = await tokensApi.refreshTokenAsync(this.refreshToken!)

      if (!response.hasError) {
        useCookie('accessToken').value = response.data!.accessToken
        useCookie('refreshToken').value = response.data!.refreshToken

        result.status = 'refreshed'
        result.accessToken = response.data!.accessToken
        result.refreshToken = response.data!.refreshToken
      }
      else {
        result.status = 'error'
      }

      return result
    },
    async closeSession(): Promise<CloseSessionResult> {
      const result: CloseSessionResult = {
        date: new Date(),
      }

      if (this.isSessionActive === false) {
        result.status = 'no session to close'
        return result
      }

      const tokensApi = useAuthApi()
      const response = await tokensApi.revokeTokenAsync(this.refreshToken!)

      if (!response.hasError) {
        useCookie('accessToken').value = ''
        useCookie('refreshToken').value = ''

        result.status = 'closed'
      }
      else {
        result.status = 'error'
        result.notClosedReason = response.errorMessage
      }

      return result
    },
    async isAccessTokenExpired(): Promise<boolean> {
      if (!this.accessToken) {
        return false
      }
      return this.accessTokenExpiresIn! < new Date()
    },
    async isRefreshTokenExpired(): Promise<boolean> {
      if (!this.refreshToken) {
        return false
      }
      return this.refreshTokenExpiresIn! < new Date()
    },
  },
})
