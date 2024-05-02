import type { BaseResponse, SubjectType } from '~/types'

export const useSubjectTypes = defineStore('subjectTypes', {
  state: () => ({
    search: '',
    data: [] as SubjectType[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
      },
      {
        key: 'isPrimitiveType',
        header: 'Czy typ prymitywny?',
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
      const { data } = await useFetch<BaseResponse<SubjectType[]>>('SubjectTypes', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value!.data
    },
    async create(subjectType: SubjectType) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<SubjectType>>('SubjectTypes', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(subjectType),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data)
    },
    async update(subjectType: SubjectType) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<SubjectType>>('SubjectTypes', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(subjectType),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(subjectType: SubjectType) {
      const runtimeConfig = useRuntimeConfig()
      await $fetch<SubjectType>(`SubjectTypes/${subjectType.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== subjectType.id)
    },
  },
})
