import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { SequenceDateTimesResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/ApiResponse'

export const useLessonSequenceDateTimesGeneratorApi = defineStore('LessonSequenceDateTimesGeneratorApi', {
  state: () => ({
  }),
  actions: {
    async generateLessonSequenceDateTimes(startDateTime: string, numberOfDates: number): Promise<ApiResponse<SequenceDateTimesResult> | null> {
      const { makeRequest } = useApiRequest()
      const result = await makeRequest<SequenceDateTimesResult>(Method.GET, `LessonsDateTimeSequenceGeneration/${startDateTime}/${numberOfDates}`)
      return result
    },
  },
})
