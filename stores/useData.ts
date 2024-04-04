export const useData = defineStore('data', {
  state: () => {
    return {
      studyModes: ['stacjonarne', 'zaoczne'],
      studyTypes: ['licencjackie', 'inżynierskie', 'magisterskie'],
    }
  },
  actions: {
    mapArrayToLabelValue<T>(array: T[]) {
      return array.map((item, index) => {
        return { label: item, value: index }
      })
    },
  },
})
