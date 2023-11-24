import { PropType, computed, defineComponent, toRefs } from 'vue'
import { getTemplate } from './getTemplate'
import { QuestionType } from '../data/questions'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'question',
    dataInjects: {
      question__title: 'title',
      question__question: 'question',
    },
  }),
  props: {
    question: {
      type: Object as PropType<QuestionType>,
      required: true,
    },
  },

  setup(props) {
    const { question } = toRefs(props)
    return {
      title: computed(() => question.value.title),
      question: computed(() => question.value.question),
      answers: computed(() => question.value.answers),
    }
  },
})
