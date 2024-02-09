import { computed, defineComponent } from 'vue'
import { getTemplate } from './getTemplate'
import DownloadButton from './DownloadButton'
import { useEvaluation } from '../data/evaluation'
import { useDownload } from '../data/download'

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
