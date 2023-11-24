import { computed, ref } from 'vue'

export type QuestionType = {
  title: string
  question: string
  answers: AnswerType[]
}

export type AnswerType = {
  answer: string
}

const getQuestionsData = (): QuestionType[] => {
  const questionElements = document.querySelectorAll('[data-bdtl="question"]')
  const questionsData = [...questionElements].map((element, index) => {
    const title =
      element
        .querySelector('[data-bdtl="question__title"]')
        ?.textContent?.trim() || ''
    const question =
      element
        .querySelector('[data-bdtl="question__question"]')
        ?.textContent?.trim() || ''

    const answerElements = element.querySelectorAll('[data-bdtl="answer"]')
    const answers = [...answerElements].map((element, index) => {
      const answer =
        element
          .querySelector('[data-bdtl="answer__label"]')
          ?.textContent?.trim() || ''
      return {
        answer,
      }
    })
    return {
      title,
      question,
      answers,
    }
  })
  return questionsData
}

export const allQuestions = getQuestionsData()

export const currentQuestionIndex = ref(0)

export const useQuestions = () => {
  const allQuestionsComputed = computed(() => allQuestions)
  const currentQuestionIndexComputed = computed(
    () => currentQuestionIndex.value
  )

  const currentQuestion = computed(() => {
    return allQuestions[currentQuestionIndex.value]
  })

  const incrementCurrentQuestionIndex = () => {
    currentQuestionIndex.value =
      (currentQuestionIndex.value + 1) % allQuestions.length
  }

  const decrementCurrentQuestionIndex = () => {
    currentQuestionIndex.value =
      Math.abs(currentQuestionIndex.value - 1) % allQuestions.length
  }

  const setCurrentQuestionIndex = (index: number) => {
    currentQuestionIndex.value = Math.abs(index) % allQuestions.length
  }

  return {
    allQuestions: allQuestionsComputed,
    currentQuestionIndex: currentQuestionIndexComputed,
    currentQuestion,
    incrementCurrentQuestionIndex,
    decrementCurrentQuestionIndex,
    setCurrentQuestionIndex,
  }
}
