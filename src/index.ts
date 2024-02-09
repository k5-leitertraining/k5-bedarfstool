import { createApp } from 'vue'
import TrackRoot from './components/TrackRoot'
import QuestionRoot from './components/QuestionRoot'
import EvaluationRoot from './components/EvaluationRoot'
import DownloadRoot from './components/DownloadRoot'
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
      'download-root': /* html */ `
        <download-root v-show="isFinished" />
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
