import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate'
import { useEvaluation } from '../data/evaluation'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'evaluation-point',
    dataInjects: {
      'evaluation-text': 'evaluationText',
    },
  }),
  components: {},
  setup() {
    const { evaluationText } = useEvaluation()
    return {
      evaluationText,
    }
  },
})
