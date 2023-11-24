import { PropType, defineComponent } from 'vue'
import { getTemplate } from './getTemplate'

const QuestionArrowLeft = defineComponent({
  template: getTemplate({
    templateRoot: 'question-arrow--left',
  }),
})

const QuestionArrowRight = defineComponent({
  template: getTemplate({
    templateRoot: 'question-arrow--right',
  }),
})

export default defineComponent({
  template: /* html */ `
    <question-arrow-left v-if="direction === 'left'" @click.native="$emit('click')" />
    <question-arrow-right v-if="direction === 'right'" @click.native="$emit('click')" />
  `,
  emits: ['click'],
  props: {
    direction: {
      type: String as PropType<'left' | 'right'>,
      required: true,
    },
  },
  components: {
    QuestionArrowLeft,
    QuestionArrowRight,
  },
})
