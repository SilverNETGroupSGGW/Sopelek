import type { BaseResponse, ClassroomType } from '~/types'

export const useClassroomTypes = defineStore('classroomTypes', {
  state: () => ({
    search: '',
    data: [] as ClassroomType[],
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
      const { data } = await useFetch<BaseResponse<ClassroomType[]>>('ClassroomTypes', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = data.value!.data
    },
    async create(classroomType: ClassroomType) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<ClassroomType>>('ClassroomTypes', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(classroomType),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data)
    },
    async update(classroomType: ClassroomType) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<ClassroomType>>('ClassroomTypes', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(classroomType),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(classroomType: ClassroomType) {
      const runtimeConfig = useRuntimeConfig()
      await $fetch<ClassroomType>(`ClassroomTypes/${classroomType.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== classroomType.id)
    },
  },
})
