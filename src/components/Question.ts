import { PropType, computed, defineComponent, toRefs } from 'vue'
import { getTemplate } from './getTemplate.js'
import { QuestionType } from '../data/questions.js'
import Answer from './Answer.js'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'question',
    dataInjects: {
      question__title: 'title',
      question__question: 'question',
    },
    templateInjects: {
      'answer-root': /* html */ `
        <answer
          v-for="(answer, index) in answers"
          :key="index"
          :label="answer.label"
          :model-value="answer.value"
          @update:model-value="$emit('update:answer', { index, value: $event })"
        />
      `,
    },
  }),
  props: {
    question: {
      type: Object as PropType<QuestionType>,
      required: true,
    },
  },
  components: {
    Answer,
  },
  emits: ['update:answer'],
  setup(props) {
    const { question } = toRefs(props)
    return {
      title: computed(() => question.value.title),
      question: computed(() => question.value.question),
      answers: computed(() => question.value.answers),
    }
  },
})
