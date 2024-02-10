import type { Subject } from "~/types";

export const useMouse = defineStore('mouse', {
  state: () => ({
    cursor: '' as 'cursor-nw-resize' | 'cursor-ne-resize' | 'cursor-se-resize' | 'cursor-sw-resize' | 'cursor-w-resize' | 'cursor-e-resize' | 'cursor-n-resize' | 'cursor-s-resize' | 'cursor-move' | '',
    isDragging: false,
    isResizing: false,
    resizeEdge: '' as 'nw' | 'ne' | 'se' | 'sw' | 'w' | 'e' | 'n' | 's' | '',
    currentLesson: {} as Subject
  }),
})
