import { computed, watch } from 'vue'
import { AnswerType, useQuestions } from './questions'

const getEvaluationData = () => {
  const evaluationTextRaw =
    document.querySelector('[data-bdtl="evaluation-text"]')?.textContent || ''

  const evaluationTexts = evaluationTextRaw
    .split('|')
    .map((text) => text.trim())

  return evaluationTexts
}

const evaluationTexts = getEvaluationData()

const MULTI_SELECT_FACTOR = 0.75

const calculateScoreOfSelectedAnswers = (answers: AnswerType[]) => {
  const checkedAnswers = answers.filter((answer) => answer.value)
  const factor = checkedAnswers.length > 1 ? MULTI_SELECT_FACTOR : 1
  const scoreRaw = checkedAnswers.reduce((score, answer) => {
    return score + answer.weight
  }, 0)
  return scoreRaw * factor
}

const calculateScoreOfMaxAnswers = (answers: AnswerType[]) => {
  const positiveAnswers = answers.filter((answer) => answer.weight > 0)
  const factor = positiveAnswers.length > 1 ? MULTI_SELECT_FACTOR : 1
  const scoreRaw = positiveAnswers.reduce((score, answer) => {
    return score + answer.weight
  }, 0)
  return scoreRaw * factor
}

const calculateScoreOfMinAnswers = (answers: AnswerType[]) => {
  const negativeAnswers = answers.filter((answer) => answer.weight < 0)
  const factor = negativeAnswers.length > 1 ? MULTI_SELECT_FACTOR : 1
  const scoreRaw = negativeAnswers.reduce((score, answer) => {
    return score + answer.weight
  }, 0)
  return scoreRaw * factor
}

export const useEvaluation = () => {
  const { allQuestions } = useQuestions()

  const score = computed(() => {
    // current score
    const currentScore = allQuestions.value.reduce((score, question) => {
      const questionScore = calculateScoreOfSelectedAnswers(question.answers)
      return score + questionScore * question.weight
    }, 0)

    // max score
    const maxScore = allQuestions.value.reduce((score, question) => {
      const questionScore = calculateScoreOfMaxAnswers(question.answers)
      return score + questionScore * question.weight
    }, 0)

    // min score
    const minScore = allQuestions.value.reduce((score, question) => {
      const questionScore = calculateScoreOfMinAnswers(question.answers)
      return score + questionScore * question.weight
    }, 0)

    // in percent
    return currentScore >= 0
      ? 50 + (currentScore / maxScore) * 50
      : 50 - (currentScore / minScore) * 50
  })

  const evaluationText = computed(() => {
    const evaluationTextIndex = Math.floor(
      score.value * 0.01 * (evaluationTexts.length - 0.000001)
    )
    return evaluationTexts[evaluationTextIndex]
  })

  const isFinished = computed(() => {
    return allQuestions.value.every((question) =>
      question.answers.some((answer) => answer.value)
    )
  })

  return {
    score,
    evaluationText,
    isFinished,
  }
}
