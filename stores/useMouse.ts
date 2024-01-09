import type { Subject } from '~/types'

export const useMouse = defineStore('mouse', {
  state: () => ({
    isResizing: false,
    isCreating: false,
    resizeEdge: null as null | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'top' | 'bottom',
    currentSubject: null as null | Subject,
  }),
})
