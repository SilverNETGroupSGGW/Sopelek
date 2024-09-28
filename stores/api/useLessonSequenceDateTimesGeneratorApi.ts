import useApiRequest from '~/composables/useApiRequest'
import { RequestTypes as Method } from '~/types'
import type { SequenceDateTimesResult } from '~/types/apiResults'
import type { ApiResponse } from '~/types/apiResults/common/ApiResponse'

export const useLessonSequenceDateTimesGeneratorApi = defineStore('LessonSequenceDateTimesGeneratorApi', {
  state: () => ({ }),
  actions: {
    async generateLessonSequenceDateTimes(startDateTime: string, numberOfDates: number): Promise<ApiResponse<SequenceDateTimesResult>> {
      const { makeRequest } = useApiRequest()
      return await makeRequest<SequenceDateTimesResult>(Method.GET, `LessonsDateTimeSequenceGeneration/${startDateTime}/${numberOfDates}`)
    },
  },
})
