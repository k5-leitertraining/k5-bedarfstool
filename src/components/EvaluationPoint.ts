import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'
import { useEvaluation } from '../data/evaluation.js'
import EvaluationPoint from './EvaluationPoint.html'

export default defineComponent({
  template:
    getTemplate({
      templateRoot: 'evaluation-point',
      dataInjects: {
        'evaluation-text': 'evaluationText',
      },
    }) || EvaluationPoint,
  components: {},
  setup() {
    const { evaluationText } = useEvaluation()
    return {
      evaluationText,
    }
  },
})
