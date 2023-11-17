import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'track-point--done',
    dataInjects: {
      'track-point__number': 'number',
      'track-point__name': 'name',
    },
  }),
  props: {
    number: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
})
