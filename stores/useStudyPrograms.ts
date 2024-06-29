import type { BaseResponse, StudyProgram } from '~/types'

export const useStudyPrograms = defineStore('studyPrograms', {
  state: () => ({
    search: '',
    data: [] as StudyProgram[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
      },
      {
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get() {
      const runtimeConfig = useRuntimeConfig()
      const { data } = await useFetch<BaseResponse<StudyProgram[]>>(`studyprogram/all`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value!.data.sort((a, b) => a.name.localeCompare(b.name))
    },
    async create(studyProgram: StudyProgram) {
      const runtimeConfig = useRuntimeConfig()
      const { studiesDegrees, studiesModes, fieldOfStudies } = useData()

      studyProgram.degreeOfStudy = studiesDegrees.find(d => d.value === studyProgram.degreeOfStudy)!.type
      studyProgram.faculty = fieldOfStudies.find(f => f.value === studyProgram.fieldOfStudy)!.department
      studyProgram.studyMode = studiesModes.find(m => m.value === studyProgram.studyMode)!.type

      const data = await $fetch<BaseResponse<StudyProgram>>('studyprogram', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(studyProgram),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data)
    },
    async update(studyProgram: StudyProgram) {
      const runtimeConfig = useRuntimeConfig()
      const { studiesDegrees, studiesModes, fieldOfStudies } = useData()

      studyProgram.degreeOfStudy = studiesDegrees.find(d => d.value === studyProgram.degreeOfStudy)!.type
      studyProgram.fieldOfStudy = fieldOfStudies.find(f => f.value === studyProgram.fieldOfStudy)!.department
      studyProgram.studyMode = studiesModes.find(m => m.value === studyProgram.studyMode)!.type

      const data = await $fetch<BaseResponse<StudyProgram>>('studyprogram', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(studyProgram),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(studyProgram: StudyProgram) {
      const runtimeConfig = useRuntimeConfig()
      await $fetch<StudyProgram>(`studyprogram/${studyProgram.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== studyProgram.id)
    },
  },
})
