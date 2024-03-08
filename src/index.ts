import { createApp } from 'vue'
import TrackRoot from './components/TrackRoot.js'
import QuestionRoot from './components/QuestionRoot.js'
import EvaluationRoot from './components/EvaluationRoot.js'
import DownloadRoot from './components/DownloadRoot.js'
import FinishRoot from './components/FinishRoot.js'
import { getTemplate } from './components/getTemplate.js'
import { useEvaluation } from './data/evaluation.js'

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
      'download-root': /* html */ `
        <download-root v-show="isFinished" />
      `,
      'finish-root': /* html */ `
        <finish-root v-if="isFinished" />
      `,
    },
  }),
  components: {
    TrackRoot,
    QuestionRoot,
    EvaluationRoot,
    DownloadRoot,
    FinishRoot,
  },
  setup() {
    const { isFinished } = useEvaluation()

    return {
      isFinished,
    }
  },
}).mount('#bdtl-app')
