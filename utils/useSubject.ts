import type { Subject } from '~/types'

export default function useSubject() {
  // Constants for calculating position of a subject
  const edgeThreshold = 16 // resize and drag bounds
  const intervalHeight = 160 // height of a group cell,
  const intervalWidth = 24 // width of 5 minutes interval cell

  function calculatePosition(subject: Subject, groups: string[]) {
    const startTime = new Date(`1970-01-01T${subject.startTime}`)

    const [hours, minutes, seconds] = subject.duration!.split(':').map(Number)
    const duration = new Date(`1970-01-01T00:00:00Z`)
    duration.setHours(hours, minutes, seconds)

    const durationInMilliseconds = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
    const endTime = new Date(startTime.getTime() + durationInMilliseconds)

    const x = ((startTime.getHours() - 8) * 60 + startTime.getMinutes()) * (intervalWidth / 5)
    const y = groups.findIndex(group => subject.groups!.some(subjectGroup => subjectGroup.name === group)) * intervalHeight

    const height = subject.groups!.length * intervalHeight
    const width = ((endTime.getHours() * 60 + endTime.getMinutes()) - (startTime.getHours() * 60 + startTime.getMinutes())) * 4.8

    return { x, y, width, height }
  }

  function calculateStartTime(subject: Subject) {
    const baseTime = new Date()
    baseTime.setHours(8, 0, 0, 0)

    const minutesFromBase = (subject.x! / intervalWidth) * 5
    const newTime = new Date(baseTime.getTime() + minutesFromBase * 60000)
    const hours = newTime.getHours() < 10 ? `0${newTime.getHours()}` : newTime.getHours()
    const minutes = newTime.getMinutes() < 10 ? `0${newTime.getMinutes()}` : newTime.getMinutes()
    subject.startTime = `${hours}:${minutes}:00`
  }

  function calculateGroups(subject: Subject) {
    const currentGroupIndex = subject.y! / intervalHeight
    const newGroupCount = subject.height! / intervalHeight
    subject.groups = subject.groups!.slice(currentGroupIndex, currentGroupIndex + newGroupCount)
  }

  return {
    calculatePosition,
    calculateStartTime,
    calculateGroups,
  }
}
