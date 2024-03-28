import { useEvaluation } from '../data/evaluation.js'
import { useQuestions } from '../data/questions.js'

type StatisticEntry = {
  date: string
  email: string
  orgName: string
  questions: {
    question: string
    answers: string[]
  }[]
  score: number
}

export const useResultTracking = () => {
  const { score } = useEvaluation()
  const { allQuestions } = useQuestions()

  const trackResult = (data: { email: string; orgName: string }) => {
    return fetch(
      'https://k5-leitertraining.de/.netlify/functions/bedarfstool-statistic',
      {
        method: 'POST',
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0] || '',
          email: data.email,
          orgName: data.orgName,
          questions: allQuestions.value.map((question) => ({
            question: `[${question.title}] ${question.question}`,
            answers: question.answers
              .filter(({ value }) => value)
              .map(({ label }) => label),
          })),
          score: score.value,
        } satisfies StatisticEntry),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  return {
    trackResult,
  }
}
