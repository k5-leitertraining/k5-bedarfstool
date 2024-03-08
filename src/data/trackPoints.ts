import { computed } from 'vue'
import { useQuestions } from './questions.js'

export type TrackPointType = {
  number: string
  name: string
  status: 'open' | 'current' | 'done'
}

export const useTrackPoints = () => {
  const { allQuestions, currentQuestionIndex } = useQuestions()

  const isQuestionDone = (questionIndex: number) => {
    const questionAnswers = allQuestions.value[questionIndex]?.answers
    if (!questionAnswers) {
      return false
    }
    return Object.values(questionAnswers).some(({ value }) => value)
  }

  const trackPoints = computed(() => {
    return allQuestions.value.map((question, questionIndex) => {
      return {
        number: String(questionIndex + 1),
        name: question.title,
        status:
          currentQuestionIndex.value === questionIndex
            ? ('current' as const)
            : isQuestionDone(questionIndex)
            ? ('done' as const)
            : ('open' as const),
      }
    })
  })

  return {
    trackPoints,
  }
}
