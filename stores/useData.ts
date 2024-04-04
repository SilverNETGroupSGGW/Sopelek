export const useData = defineStore('data', {
  state: () => {
    return {
      studyModes: ['stacjonarne', 'zaoczne'],
      studyTypes: ['licencjackie', 'inżynierskie', 'magisterskie'],
    }
  },
})
