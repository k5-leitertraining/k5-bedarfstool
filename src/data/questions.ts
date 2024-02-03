import { computed, ref } from 'vue'

export type QuestionType = {
  title: string
  question: string
  weight: number
  answers: AnswerType[]
}

export type AnswerType = {
  label: string
  value: boolean | null
  weight: number
}

const getWeightedText = (textRaw: string, defaultWeight: number = 0) => {
  const [, weightRaw, text] = textRaw.match(/\[([-+]?\d+)\](.*)/m) || []
  const weight = parseInt(weightRaw || '') || defaultWeight
  return { weight, text: text || textRaw }
}

const getQuestionsData = (): QuestionType[] => {
  const questionElements = document.querySelectorAll('[data-bdtl="question"]')
  const questionsData = [...questionElements].map((element) => {
    const titleRaw =
      element
        .querySelector('[data-bdtl="question__title"]')
        ?.textContent?.trim() || ''
    const { weight, text: title } = getWeightedText(titleRaw, 1)
    const question =
      element
        .querySelector('[data-bdtl="question__question"]')
        ?.textContent?.trim() || ''

    const answerElements = element.querySelectorAll('[data-bdtl="answer"]')
    const answers = [...answerElements].map((element) => {
      const labelRaw =
        element
          .querySelector('[data-bdtl="answer__label"]')
          ?.textContent?.trim() || ''
      const { weight, text: label } = getWeightedText(labelRaw)
      return {
        label: label || labelRaw,
        value: null,
        weight,
      }
    })
    return {
      title,
      question,
      weight,
      answers,
    }
  })
  return questionsData
}

export const allQuestions = getQuestionsData()

const currentQuestionIndex = ref(0)

const currentAnswers = ref<Record<number, Record<number, boolean>>>({})

const isNegativeAnswer = (answer: AnswerType) => {
  return answer.weight < 0
}

const deactivateOppositeAnswers = ({
  questionIndex,
  answerIndex,
}: {
  questionIndex: number
  answerIndex: number
}) => {
  const answers = allQuestions[questionIndex]?.answers
  const checkedAnswer = answers?.[answerIndex]
  if (!checkedAnswer) return
  answers.forEach((answer, index) => {
    if (isNegativeAnswer(answer) === isNegativeAnswer(checkedAnswer)) {
      return
    }
    currentAnswers.value[questionIndex] = {
      ...currentAnswers.value[questionIndex],
      [index]: false,
    }
  })
}

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
    const newIndex = currentQuestionIndex.value - 1
    if (newIndex < 0) {
      currentQuestionIndex.value = allQuestionsComputed.value.length - 1
      return
    }
    currentQuestionIndex.value = newIndex % allQuestionsComputed.value.length
  }

  const setCurrentQuestionIndex = (index: number) => {
    currentQuestionIndex.value =
      Math.abs(index) % allQuestionsComputed.value.length
  }

  const setCurrentQuestionAnswer = (index: number, value: boolean) => {
    deactivateOppositeAnswers({
      questionIndex: currentQuestionIndex.value,
      answerIndex: index,
    })
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
