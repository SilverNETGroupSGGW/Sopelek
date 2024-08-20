import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { EasyUseAxiosReturn } from '@vueuse/integrations'
import { RequestTypes } from '~/types/RequestType'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export default function useApiRequest() {
  const runtimeConfig = useRuntimeConfig()

  const instance = axios.create({
    baseURL: runtimeConfig.public.baseURL,
  })

  const makeRequest = async <T>(
    method: RequestTypes,
    url: string,
    data: object | null = null,
    params: object | null = null,
    useAuth: boolean = false,
  ): Promise<ApiResponse<T>> => {
    const axios = useAxios(instance)

    // Look at AxiosRequestConfig: https://axios-http.com/docs/req_config
    const requestData: AxiosRequestConfig<any> = {
      url,
      method: RequestTypes[method].toLowerCase(),
      data,
      params,

      headers: useAuth ? { Authorization: `Bearer ${useCookie('accessToken').value}` } : {},
    }

    try {
      const axiosReturn: EasyUseAxiosReturn<T, AxiosResponse<T>, any> = await axios.execute(url, requestData)
      const response = axiosReturn.response.value

      return {
        data: response ? response.data as T : null,
        status: response ? response.status : 500,
        statusText: response ? response.statusText : 'Internal Server Error (default)',
        hasError: false,
        errorMessage: '',
        timestamp: new Date().toISOString(),
      }
    }
    catch (e) {
      console.error(e)

      if (e instanceof AxiosError) {
        const response = e.response

        return {
          data: response ? response.data as T : null,
          status: response ? response.status : 500,
          statusText: response ? response.statusText : 'Internal Server Error (request error)',
          hasError: true,
          errorMessage: e.message,
          timestamp: new Date().toISOString(),
        }
      }

      return {
        data: null,
        status: 500,
        statusText: 'Internal Server Error (common error)',
        hasError: true,
        errorMessage: (e as Error).message,
        timestamp: new Date().toISOString(),
      }
    }
  }

  return { makeRequest, instance }
}
