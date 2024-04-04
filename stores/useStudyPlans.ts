import type { Database } from '~/.'

type StudyPlan = Database['public']['Tables']['study_plans']['Row']

export const useStudyPlans = defineStore('studyPlans', {
  state: () => ({
    search: '',
    data: [] as StudyPlan[],
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

      const { data } = await useAsyncData('study_plans', async () => {
        const { data } = await client.from('study_plans').select('*')
        return data
      })

      if (data.value)
        this.data = data.value
    },
    async create(studyPlan: StudyPlan) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('study_plans').insert(studyPlan).select().order('id').limit(1).single()
      this.data.push(data!)
    },
    async update(studyPlan: StudyPlan) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('study_plans').update(studyPlan).eq('id', studyPlan.id).select().order('id').limit(1).single()
      const index = this.data.findIndex(l => l.id === data!.id)
      this.data[index] = data!
    },
    async delete(studyPlan: StudyPlan) {
      const client = useSupabaseClient<Database>()

      await client.from('study_plans').delete().eq('id', studyPlan.id)
      this.data = this.data.filter(l => l.id !== studyPlan.id)
    },
  },
})
