import type { Database } from '~'

type Classroom = Database['public']['Tables']['classrooms']['Row']

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
        key: 'actions',
        header: 'Akcje',
      },
    ],
  }),
  actions: {
    async get() {
      const client = useSupabaseClient<Database>()

      const { data } = await useAsyncData('classrooms', async () => {
        const { data } = await client.from('classrooms').select('*')
        return data
      })

      if (data.value)
        this.data = data.value
    },
    async create(classroom: Classroom) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('classrooms').insert(classroom).select().order('id').limit(1).single()
      this.data.push(data!)
    },
    async update(classroom: Classroom) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('classrooms').update(classroom).eq('id', classroom.id).select().order('id').limit(1).single()
      const index = this.data.findIndex(l => l.id === data!.id)
      this.data[index] = data!
    },
    async delete(classroom: Classroom) {
      const client = useSupabaseClient<Database>()

      await client.from('classrooms').delete().eq('id', classroom.id)
      this.data = this.data.filter(l => l.id !== classroom.id)
    },
  },
})
