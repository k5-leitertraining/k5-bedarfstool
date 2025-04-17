import { computed, defineComponent, ref, watch } from 'vue'
import { getTemplate } from './getTemplate.js'
import Question from './Question.js'
import QuestionArrow from './QuestionArrow.js'
import { useQuestions } from '../data/questions.js'
import QuestionRoot from './QuestionRoot.html'

export default defineComponent({
  template:
    getTemplate({
      templateRoot: 'question-root-',
      templateInjects: {
        'question-container': /* html */ `
        <Transition
          mode="out-in"
          class="duration-200"
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
    }) || QuestionRoot,
  props: {},
  setup() {
    const {
      currentQuestion,
      incrementCurrentQuestionIndex,
      decrementCurrentQuestionIndex,
      currentQuestionIndex,
      setCurrentQuestionAnswer,
      isFirstQuestion,
      isLastQuestion,
    } = useQuestions()

    const isBackwardMoving = ref(false)
    watch(currentQuestionIndex, (newIndex, oldIndex) => {
      if (newIndex < oldIndex) {
        isBackwardMoving.value = true
      } else {
        isBackwardMoving.value = false
      }
    })

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
      isBackwardMoving,
    }
  },
  components: {
    Question,
    QuestionArrow,
  },
})

var style = document.createElement('style')
style.textContent = `
.duration-200 {
transition-duration: 200ms;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
`
document.head.appendChild(style)
