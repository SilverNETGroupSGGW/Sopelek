export const useApiViewRequestParameters = defineStore('apiViewRequestParameters', {
  state: () => ({
    data: [] as { key: string, value: any | null }[],
  }),
  actions: {
    storeParam(key: string, value: any) {
      if (this.data.filter(d => d.key === key).length > 0) {
        this.data = this.data.filter(d => d.key !== key)
      }
      this.data.push({ key, value })
    },
    hasKey(key: string) {
      return this.data.filter(d => d.key === key).length > 0
    },
    getParam(key: string): any | null {
      const result = this.data.filter(d => d.key === key)[0]?.value
      return result ? result as any : null
    },
    getIfExistsOrDefault(key: string, defaultValue: any): any {
      const result = this.data.filter(d => d.key === key)[0]?.value
      return result ? result as any : defaultValue
    },
    clear() {
      this.data = []
    },
  },
})
