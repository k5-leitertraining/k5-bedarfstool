import { defineComponent, computed, PropType } from 'vue'
import { getTemplate } from './getTemplate.js'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'answer',
    dataInjects: {
      answer__label: 'label',
    },
    withVModel: {
      answer__checkbox: 'value',
    },
    withAttrs: {
      answer__checkbox: {
        ':id': 'id',
      },
      answer__label: {
        ':for': 'id',
      },
    },
  }),
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [Boolean] as PropType<boolean | null>,
    },
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:model-value', value)
      },
    })
    return {
      value,
      id: `answer-${Math.random().toString(36).substr(2, 9)}`,
    }
  },
})
