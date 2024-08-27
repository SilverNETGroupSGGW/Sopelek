import type { UserTokens } from '~/types'

export class AuthApiService {
  public async login(email?: string, password?: string, deviceToken: string = ''): Promise<UserTokens> {
    const { refreshToken, accessToken } = await $fetch<UserTokens>('tokens/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      baseURL: runtimeConfig.public.baseURL,
    })
    isSubmitting.value = false

    return this.http.post<CurrentAccountToken>(`${this.apiUrl}/api/Tokens/login`, { email, password, deviceToken })
  }

  public async getTokensAsync(email?: string, password?: string, deviceToken: string = ''): Promise<LoginResult> {
    const url = `${this.apiUrl}/api/Tokens/login`
    const body = { email, password, deviceToken }

    let result: LoginResult

    try {
      const response = await this.http.post<CurrentAccountToken>(url, body).toPromise()

      result = {
        accessToken: response?.accessToken,
        refreshToken: response?.refreshToken,
        hasError: false,
      }
    }
    catch (e) {
      result = {
        hasError: true,
        errorMessage: (e as HttpErrorResponse).error,
      }
    }

    return result
  }

  public async register(email?: string, password?: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/api/Account/register`, { email, password }).toPromise()
  }

  public async resendVerificationEmail(email?: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/api/Account/resend-confirmation-code`, { email }).toPromise()
  }

  public async verifyEmail(email?: string, verificationCode?: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/api/Account/confirm`, { email, verificationCode }).toPromise()
  }
}
