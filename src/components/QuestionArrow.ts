import { PropType, computed, defineComponent, toRefs } from 'vue'
import { getTemplate } from './getTemplate.js'

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
    <question-arrow-left v-if="direction === 'left'" @click.native="handleClick" :style="style" />
    <question-arrow-right v-if="direction === 'right'" @click.native="handleClick" :style="style" />
  `,
  emits: ['click'],
  props: {
    direction: {
      type: String as PropType<'left' | 'right'>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    QuestionArrowLeft,
    QuestionArrowRight,
  },
  setup(props, { emit }) {
    const { disabled } = toRefs(props)

    const style = computed(() =>
      disabled.value
        ? {
            cursor: 'not-allowed',
            opacity: 0.5,
          }
        : {}
    )

    const handleClick = () => {
      if (disabled.value) return
      emit('click')
    }

    return {
      style,
      handleClick,
    }
  },
})
