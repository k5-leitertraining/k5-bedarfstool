import { computed, defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'
import EvaluationPoint from './EvaluationPoint.js'
import { useEvaluation } from '../data/evaluation.js'
import EvaluationRoot from './EvaluationRoot.html'

export default defineComponent({
  template:
    getTemplate({
      templateRoot: 'evaluation-root',
      templateReplaces: {
        'evaluation-point': /* html */ `
        <evaluation-point :style="style" />
      `,
      },
    }) || EvaluationRoot,
  components: {
    EvaluationPoint,
  },
  setup() {
    const { score } = useEvaluation()
    const style = computed(() => ({
      left: `${score.value}%`,
    }))
    return {
      style,
    }
  },
})
