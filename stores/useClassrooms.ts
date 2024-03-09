import type { BaseResponse, Classroom } from '~/types'

export const useClassrooms = defineStore('classrooms', {
  state: () => ({
    search: '',
    data: [] as Classroom[],
    columns: [
      {
        key: 'name',
        header: 'Nazwa',
      },
      {
        key: 'capacity',
        header: 'Pojemność',
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
      const { data } = await useFetch<BaseResponse<Classroom[]>>('classrooms', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'GET',
      })
      
      this.data = data.value!.data.sort((a, b) => {
        const aNumber = Number(a.name)
        const bNumber = Number(b.name)

        if (Number.isNaN(aNumber) || Number.isNaN(bNumber))
          return a.name.localeCompare(b.name)

        return aNumber - bNumber
      })
    },
    async create(classroom: Classroom) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<Classroom>>('classrooms', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'POST',
        body: JSON.stringify(classroom),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data.push(data.data)
    },
    async update(classroom: Classroom) {
      const runtimeConfig = useRuntimeConfig()
      const data = await $fetch<BaseResponse<Classroom>>('classrooms', {
        baseURL: runtimeConfig.public.baseURL,
        method: 'PUT',
        body: JSON.stringify(classroom),
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      const index = this.data.findIndex(l => l.id === data.data.id)
      this.data[index] = data.data
    },
    async delete(classroom: Classroom) {
      const runtimeConfig = useRuntimeConfig()
      await $fetch(`classrooms/${classroom.id}`, {
        baseURL: runtimeConfig.public.baseURL,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${useCookie('accessToken').value}`,
        },
      })

      this.data = this.data.filter(l => l.id !== classroom.id)
    },
  },
})
