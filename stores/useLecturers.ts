import type { Database } from '~'

type Lecturer = Database['public']['Tables']['lecturers']['Row']

export const useLecturers = defineStore('lecturers', {
  state: () => ({
    search: '',
    data: [] as Lecturer[],
    columns: [
      {
        key: 'name',
        header: 'Dane',
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

      const { data } = await useAsyncData('lecturers', async () => {
        const { data } = await client.from('lecturers').select('*')
        return data
      })

      if (data.value)
        this.data = data.value
    },
    async create(lecturer: Lecturer) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('lecturers').insert(lecturer).select().order('id').limit(1).single()
      this.data.push(data!)
    },
    async update(lecturer: Lecturer) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('lecturers').update(lecturer).eq('id', lecturer.id).select().order('id').limit(1).single()
      const index = this.data.findIndex(l => l.id === data!.id)
      this.data[index] = data!
    },
    async delete(lecturer: Lecturer) {
      const client = useSupabaseClient<Database>()

      await client.from('lecturers').delete().eq('id', lecturer.id)
      this.data = this.data.filter(l => l.id !== lecturer.id)
    },
  },
})
