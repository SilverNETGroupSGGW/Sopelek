import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { EasyUseAxiosReturn } from '@vueuse/integrations'
import { RequestTypes } from '~/types/RequestType'
import type { ServerResponse } from '~/types/apiResults/common/ServerResponse'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

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
    mapResponse: boolean = true,
  ): Promise<ApiResponse<T>> => {
    const axios = useAxios(instance)

    // Look at AxiosRequestConfig: https://axios-http.com/docs/req_config
    const requestData: AxiosRequestConfig<any> = {
      url,
      method: RequestTypes[method].toLowerCase(),
      data,
      params,
      headers: useAuth
        ? { Authorization: `Bearer ${useCookie('accessToken').value}` }
        : {},
    }

    const error500Default: string = 'Internal Server Error (default)'

    // eslint-disable-next-line prefer-const
    let apiResponse: ApiResponse<T> = {
      data: null,
      status: 200,
      statusText: '',
      hasError: false,
      errorMessage: '',
      timestamp: new Date().toISOString(),
    }

    try {
      const axiosReturn: EasyUseAxiosReturn<T, AxiosResponse<T>, any> = await axios.execute(url, requestData)
      const response = axiosReturn.response.value

      apiResponse.status = response?.status ? response.status : 500
      apiResponse.statusText = response?.statusText ? response.statusText : error500Default
      apiResponse.data = mapResponse
        ? (response?.data as unknown as ServerResponse<T>).data
        : response?.data as T

      return apiResponse
    }
    catch (e) {
      console.error(e)

      apiResponse.hasError = true

      if (e instanceof AxiosError) {
        const response = e.response

        apiResponse!.data = response?.data ? response.data : null
        apiResponse.status = response?.status ? response.status : 500
        apiResponse.statusText = response?.statusText ? response.statusText : 'Internal Server Error (request error)'
        apiResponse.errorMessage = e.message
        return apiResponse
      }

      apiResponse.data = null
      apiResponse.status = 500
      apiResponse.statusText = 'Internal Server Error (common error)'
      apiResponse.errorMessage = (e as Error).message
      return apiResponse
    }
  }

  return { makeRequest, instance }
}
