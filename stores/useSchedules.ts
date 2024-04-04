import type { Database } from '~'

type Schedule = Database['public']['Tables']['schedules']['Row']

export const useSchedules = defineStore('schedules', {
  state: () => ({
    search: '',
    data: [] as Schedule[],
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
    async get(studyPlanId: number) {
      const client = useSupabaseClient<Database>()

      const { data } = await useAsyncData('schedules', async () => {
        const { data } = await client.from('schedules').select('*').eq('study_plan_id', studyPlanId)
        return data
      })

      if (data.value)
        this.data = data.value
    },
    async create(schedule: Schedule, studyPlanId: number) {
      const client = useSupabaseClient<Database>()

      schedule.is_published = false
      schedule.study_plan_id = studyPlanId

      const { data } = await client.from('schedules').insert(schedule).select().order('id').limit(1).single()
      this.data.push(data!)
    },
    async update(schedule: Schedule) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('schedules').update(schedule).eq('id', schedule.id).select().order('id').limit(1).single()
      const index = this.data.findIndex(l => l.id === data!.id)
      this.data[index] = data!
    },
    async delete(schedule: Schedule) {
      const client = useSupabaseClient<Database>()

      await client.from('schedules').delete().eq('id', schedule.id)
      this.data = this.data.filter(l => l.id !== schedule.id)
    },
  },
})
