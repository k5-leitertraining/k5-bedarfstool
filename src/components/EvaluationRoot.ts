import { computed, defineComponent } from 'vue'
import { getTemplate } from './getTemplate'
import EvaluationPoint from './EvaluationPoint'
import { useEvaluation } from '../data/evaluation'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'evaluation-root',
    templateReplaces: {
      'evaluation-point': /* html */ `
        <evaluation-point :style="style" />
      `,
    },
  }),
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
