import { expect, it } from 'vitest'
import useSubject from '../utils/useSubject'
import type { Subject } from '../types'

it('useSubjects 1', () => {
  const subject: Subject = {
    startTime: '08:00:00',
    duration: '00:45:00',
    groupsIds: ['ISI-1', 'ISI-2', 'ISK', 'TM'],
  }

  const cellHeight = 61.89

  const { calculatePosition } = useSubject()
  const position = calculatePosition(subject, cellHeight, ['ISI-1', 'ISI-2', 'ISK', 'TM'])

  expect(position).toEqual({
    x: 0,
    y: 0,
    width: 432,
    height: 61.89 * 4,
  })
})
