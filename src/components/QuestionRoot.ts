import { PropType, computed, defineComponent, nextTick, ref } from 'vue'
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
          <question :question="currentQuestion" :key="currentQuestionKey" />
        </Transition>
      `,
    },
    templateReplaces: {
      'question-arrow--left': /* html */ `
        <question-arrow direction="left" @click="onArrowLeft" />
      `,
      'question-arrow--right': /* html */ `
        <question-arrow direction="right" @click="onArrowRight" />
      `,
    },
  }),
  props: {},
  setup() {
    const {
      currentQuestion,
      incrementCurrentQuestionIndex,
      decrementCurrentQuestionIndex,
    } = useQuestions()

    const onArrowLeft = async () => {
      decrementCurrentQuestionIndex()
    }

    const onArrowRight = async () => {
      incrementCurrentQuestionIndex()
    }

    const currentQuestionKey = computed(() => {
      return currentQuestion.value.title
    })

    return {
      currentQuestion,
      currentQuestionKey,
      onArrowLeft,
      onArrowRight,
    }
  },
  components: {
    Question,
    QuestionArrow,
  },
})
