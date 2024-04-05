import type { Database } from '~'

type StudyPlan = Database['public']['Tables']['study_plans']['Row']
type Schedule = Database['public']['Tables']['schedules']['Row']

export const useSchedules = defineStore('schedules', {
  state: () => ({
    search: '',
    data: {} as StudyPlan & { schedules: Schedule[] },
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

      const { data } = await useAsyncData('study_plans', async () => {
        const { data } = await client.from('study_plans').select(`
          *,
          schedules (
            *
          )
        `).eq('id', studyPlanId).single()

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
      if (data)
        this.data.schedules.push(data)
    },
    async update(schedule: Schedule) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('schedules').update(schedule).eq('id', schedule.id).select().order('id').limit(1).single()
      if (data) {
        const index = this.data.schedules.findIndex(l => l.id === data!.id)
        this.data.schedules[index] = data
      }
    },
    async delete(schedule: Schedule) {
      const client = useSupabaseClient<Database>()

      const { data } = await client.from('schedules').delete().eq('id', schedule.id).select().order('id').limit(1).single()
      if (data)
        this.data.schedules = this.data.schedules.filter(l => l.id !== schedule.id)
    },
  },
})
