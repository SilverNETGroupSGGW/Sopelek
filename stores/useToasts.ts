export const useToasts = defineStore('toasts', {
  state: () => ({
    toasts: [] as Array<{ type: 'success' | 'error', message: string }>,
  }),
  actions: {
    addToast({ type, message }: { type: 'success' | 'error', message: string }) {
      this.toasts.push({ type, message })
    },
    removeToast(index: number) {
      this.toasts.splice(index, 1)
    },
  },
})
