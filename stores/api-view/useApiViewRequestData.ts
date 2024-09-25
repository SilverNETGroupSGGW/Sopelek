import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useApiViewRequestData = defineStore('apiViewRequestData', {
  state: () => ({
    data: [] as { key: string, value: ApiResponse<any> | null }[],
  }),
  actions: {
    storeRequest(key: string, value: ApiResponse<any>) {
      if (this.data.filter(d => d.key === key).length > 0) {
        this.data = this.data.filter(d => d.key !== key)
      }
      this.data.push({ key, value })
    },
    hasKey(key: string) {
      return this.data.filter(d => d.key === key).length > 0
    },
    getRequest(key: string): ApiResponse<any> | null {
      const result = this.data.filter(d => d.key === key)[0]?.value
      return result ? result as ApiResponse<any> : null
    },
    clear() {
      this.data = []
    },
  },
})
