export const useData = defineStore('data', {
  state: () => {
    return {
      studyModes: ['stacjonarne', 'zaoczne'],
    }
  },
  actions: {
    mapStudyMode(mode: 'stacjonarne' | 'zaoczne') {
      return mode === 'stacjonarne' ? 0 : 1
    },
  },
})
