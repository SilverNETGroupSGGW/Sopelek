export const useData = defineStore('data', {
  state: () => {
    return {
      degrees: ['mgr', 'mgr inż.', 'dr', 'dr hab.', 'prof.'],
      studyModes: ['stacjonarne', 'zaoczne'],
      studyTypes: ['licencjackie', 'inżynierskie', 'magisterskie'],
    }
  },
})
