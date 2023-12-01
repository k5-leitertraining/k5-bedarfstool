import { computed, ref } from 'vue'

export type QuestionType = {
  title: string
  question: string
  answers: AnswerType[]
}

export type AnswerType = {
  label: string
  value: boolean | null
}

const getQuestionsData = (): QuestionType[] => {
  const questionElements = document.querySelectorAll('[data-bdtl="question"]')
  const questionsData = [...questionElements].map((element) => {
    const title =
      element
        .querySelector('[data-bdtl="question__title"]')
        ?.textContent?.trim() || ''
    const question =
      element
        .querySelector('[data-bdtl="question__question"]')
        ?.textContent?.trim() || ''

    const answerElements = element.querySelectorAll('[data-bdtl="answer"]')
    const answers = [...answerElements].map((element) => {
      const label =
        element
          .querySelector('[data-bdtl="answer__label"]')
          ?.textContent?.trim() || ''
      return {
        label,
        value: null,
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

const currentQuestionIndex = ref(0)

const currentAnswers = ref<Record<number, Record<number, boolean>>>({})

export const useQuestions = () => {
  const allQuestionsComputed = computed(() =>
    allQuestions.map((question, questionIndex) => {
      return {
        ...question,
        answers: question.answers.map((answer, answerIndex) => {
          return {
            ...answer,
            value: currentAnswers.value[questionIndex]?.[answerIndex] ?? null,
          }
        }),
      }
    })
  )
  const currentQuestionIndexComputed = computed(
    () => currentQuestionIndex.value
  )

  const currentQuestion = computed(() => {
    return allQuestionsComputed.value[currentQuestionIndex.value]
  })

  const incrementCurrentQuestionIndex = () => {
    currentQuestionIndex.value =
      (currentQuestionIndex.value + 1) % allQuestionsComputed.value.length
  }

  const decrementCurrentQuestionIndex = () => {
    currentQuestionIndex.value =
      Math.abs(currentQuestionIndex.value - 1) %
      allQuestionsComputed.value.length
  }

  const setCurrentQuestionIndex = (index: number) => {
    currentQuestionIndex.value =
      Math.abs(index) % allQuestionsComputed.value.length
  }

  const setCurrentQuestionAnswer = (index: number, value: boolean) => {
    currentAnswers.value[currentQuestionIndex.value] = {
      ...currentAnswers.value[currentQuestionIndex.value],
      [index]: value,
    }
  }

  return {
    allQuestions: allQuestionsComputed,
    currentQuestionIndex: currentQuestionIndexComputed,
    currentQuestion,
    incrementCurrentQuestionIndex,
    decrementCurrentQuestionIndex,
    setCurrentQuestionIndex,
    setCurrentQuestionAnswer,
  }
}
