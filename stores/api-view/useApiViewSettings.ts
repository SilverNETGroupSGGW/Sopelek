export const useApiViewSettings = defineStore('apiViewSettings', {
  state: () => ({
    unwrapRequest: false as boolean,
    formatResponseData: false as boolean,
  }),
  actions: {
    async reset() {
      this.unwrapRequest = false
      this.formatResponseData = false
    },
  },
})
