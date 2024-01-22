import type { Subject } from '~/types'

export const useMouse = defineStore('mouse', {
  state: () => ({
    currentSubject: null as null | Subject,
    isCopying: false,
    isDragging: false,
    isCreating: false,
    isResizing: false,
    resizeEdge: null as null | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'top' | 'bottom',
  }),
})
