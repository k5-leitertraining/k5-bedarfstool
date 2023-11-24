import { computed } from 'vue'
import { useQuestions } from './questions'

export type TrackPointType = {
  number: string
  name: string
  status: 'open' | 'current' | 'done'
}

export const useTrackPoints = () => {
  const { allQuestions, currentQuestionIndex } = useQuestions()

  const trackPoints = computed(() => {
    return allQuestions.value.map((question, index) => {
      return {
        number: String(index + 1),
        name: question.title,
        status:
          currentQuestionIndex.value === index
            ? 'current'
            : ('open' as 'open' | 'current' | 'done'),
      }
    })
  })

  return {
    trackPoints,
  }
}
