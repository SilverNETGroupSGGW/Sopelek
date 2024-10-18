import { jwtDecode } from 'jwt-decode'
import type { CloseSessionResult } from '~/types/session/CloseSessionResult'
import type { CreateSessionResult } from '~/types/session/CreateSessionResult'
import type { RefreshSessionResult } from '~/types/session/RefreshSessionResult'
import { useAuthApi } from './api/useAuthApi'

export const useSession = defineStore('session', {
  state: () => ({
    isSessionActive: false as boolean,
    lastSessionRefresh: null as Date | null,
    sessionCreated: null as Date | null,
    sessionOwner: null as string | null,
  }),
  getters: {
    accessToken: () => useCookie('accessToken').value,
    refreshToken: () => useCookie('refreshToken').value,
    accessTokenExpiresIn: () => {
      return useCookie('accessToken').value
        ? new Date(jwtDecode(useCookie('accessToken').value!).exp! * 1000)
        : null
    },
    refreshTokenExpiresIn: () => {
      return useCookie('refreshToken').value
        ? new Date(jwtDecode(useCookie('refreshToken').value!).exp! * 1000)
        : null
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
        this.isSessionActive = true
        this.sessionCreated = new Date()
        this.sessionOwner = email

        useCookie('accessToken').value = response.data!.accessToken
        useCookie('refreshToken').value = response.data!.refreshToken

        result.status = 'created'
        result.accessToken = response.data!.accessToken
        result.refreshToken = response.data!.refreshToken
      }
      else {
        this.isSessionActive = false
        this.sessionCreated = null
        this.sessionOwner = null

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
        this.lastSessionRefresh = new Date()

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
        this.isSessionActive = false
        this.sessionCreated = null
        this.sessionOwner = null

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
