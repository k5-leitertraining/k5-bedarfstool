import { createApp } from 'vue'
import TrackRoot from './components/TrackRoot'
import QuestionRoot from './components/QuestionRoot'
import EvaluationRoot from './components/EvaluationRoot'
import FinishRoot from './components/FinishRoot'
import { getTemplate } from './components/getTemplate'
import { useEvaluation } from './data/evaluation'

createApp({
  template: getTemplate({
    templateRoot: '#bdtl-app',
    shouldSkipRoot: true,
    templateReplaces: {
      'track-root': /* html */ `
        <track-root />
      `,
      'question-root': /* html */ `
        <question-root />
      `,
      'evaluation-root': /* html */ `
        <evaluation-root />
      `,
      'finish-root': /* html */ `
        <finish-root v-show="isFinished" />
      `,
    },
  }),
  components: {
    TrackRoot,
    QuestionRoot,
    EvaluationRoot,
    FinishRoot,
  },
  setup() {
    const { isFinished } = useEvaluation()

    return {
      isFinished,
    }
  },
}).mount('#bdtl-app')
