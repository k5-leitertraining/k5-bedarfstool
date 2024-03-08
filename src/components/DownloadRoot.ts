import { computed, defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'
import DownloadButton from './DownloadButton.js'
import { useEvaluation } from '../data/evaluation.js'
import { useDownload } from '../data/download.js'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'download-root',
    templateReplaces: {
      'download-button': /* html */ `
        <download-button @click.native="downloadResults" />
      `,
    },
  }),
  components: {
    DownloadButton,
  },
  setup() {
    const { downloadResults } = useDownload()
    return {
      downloadResults,
    }
  },
})
