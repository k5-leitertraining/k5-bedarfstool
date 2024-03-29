import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'
import { useEvaluation } from '../data/evaluation.js'

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
