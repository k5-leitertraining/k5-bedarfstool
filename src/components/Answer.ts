import { defineComponent, computed, PropType } from 'vue'
import { getTemplate } from './getTemplate'

const template = getTemplate({
  templateRoot: 'answer',
  dataInjects: {
    answer__label: 'label',
  },
  withVModel: {
    answer__checkbox: 'value',
  },
})

export default defineComponent({
  template,
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
    }
  },
})
