import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'
import DownloadButton from './DownloadButton.html'

export default defineComponent({
  template:
    getTemplate({
      templateRoot: 'download-button',
    }) || DownloadButton,
})
