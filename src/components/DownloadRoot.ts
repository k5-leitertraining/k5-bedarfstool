import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'
import DownloadButton from './DownloadButton.js'
import { useDownload } from '../data/download.js'
import DownloadRoot from './DownloadRoot.html'

export default defineComponent({
  template:
    getTemplate({
      templateRoot: 'download-root',
      templateReplaces: {
        'download-button': /* html */ `
        <download-button @click.native="downloadResults" />
      `,
      },
    }) || DownloadRoot,
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
