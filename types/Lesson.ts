import type { Subject } from "./Subject"

export interface Lesson extends Subject {
  numberOfLesson: number
  startTime: string
}
