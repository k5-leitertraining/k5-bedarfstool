import { createApp, ref, watch } from 'vue'
import TrackRoot from './components/TrackRoot.ts'
import QuestionRoot from './components/QuestionRoot.ts'
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
    },
  }),
  components: {
    TrackRoot,
    QuestionRoot,
  },
  setup() {
    return {}
  },
}).mount('#bdtl-app')
