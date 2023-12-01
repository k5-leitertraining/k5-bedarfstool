import { computed, watch } from 'vue'
import { useQuestions } from './questions'

const getEvaluationData = () => {
  const evaluationTextRaw =
    document.querySelector('[data-bdtl="evaluation-text"]')?.textContent || ''

  const evaluationTexts = evaluationTextRaw
    .split('|')
    .map((text) => text.trim())

  return evaluationTexts
}

const evaluationTexts = getEvaluationData()

export const useEvaluation = () => {
  // calculate the score
  const { allQuestions } = useQuestions()
  const score = computed(() => {
    const total = allQuestions.value.length
    const done = allQuestions.value.filter((question) =>
      question.answers.some(({ value }) => value)
    ).length
    return Math.round((done / total) * 100)
  })

  const evaluationText = computed(() => {
    const evaluationTextIndex = Math.floor(
      score.value * 0.01 * (evaluationTexts.length - 0.000001)
    )
    return evaluationTexts[evaluationTextIndex]
  })

  return {
    score,
    evaluationText,
  }
}
