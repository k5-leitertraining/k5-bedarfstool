import { createApp } from 'vue'
import TrackRoot from './components/TrackRoot.ts'
import QuestionRoot from './components/QuestionRoot.ts'
import EvaluationRoot from './components/EvaluationRoot.ts'
import { getTemplate } from './components/getTemplate.ts'

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
    },
  }),
  components: {
    TrackRoot,
    QuestionRoot,
    EvaluationRoot,
  },
  setup() {
    return {}
  },
}).mount('#bdtl-app')
