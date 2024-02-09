import { computed, defineComponent } from 'vue'
import { getTemplate } from './getTemplate'
import Question from './Question'
import QuestionArrow from './QuestionArrow'
import { useQuestions } from '../data/questions'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'question-root',
    templateInjects: {
      'question-container': /* html */ `
        <Transition 
          mode="out-in"
          class="duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <question :question="currentQuestion" :key="currentQuestionKey" @update:answer="setCurrentQuestionAnswer($event.index, $event.value)"/>
        </Transition>
      `,
    },
    templateReplaces: {
      'question-arrow--left': /* html */ `
        <question-arrow direction="left" @click="onArrowLeft" :disabled="isFirstQuestion" />
      `,
      'question-arrow--right': /* html */ `
        <question-arrow direction="right" @click="onArrowRight" :disabled="isLastQuestion" />
      `,
    },
  }),
  props: {},
  setup() {
    const {
      currentQuestion,
      incrementCurrentQuestionIndex,
      decrementCurrentQuestionIndex,
      setCurrentQuestionAnswer,
      isFirstQuestion,
      isLastQuestion,
    } = useQuestions()

    const onArrowLeft = async () => {
      decrementCurrentQuestionIndex()
    }

    const onArrowRight = async () => {
      incrementCurrentQuestionIndex()
    }

    const currentQuestionKey = computed(() => {
      return currentQuestion.value?.title || ''
    })

    return {
      currentQuestion,
      currentQuestionKey,
      onArrowLeft,
      onArrowRight,
      setCurrentQuestionAnswer,
      isFirstQuestion,
      isLastQuestion,
    }
  },
  components: {
    Question,
    QuestionArrow,
  },
})

var style = document.createElement('style')
style.textContent = `
.duration-300 {
  transition-duration: 300ms;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
`
document.head.appendChild(style)
