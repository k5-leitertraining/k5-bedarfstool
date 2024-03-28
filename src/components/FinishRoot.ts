import { computed, defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'
import { template } from 'lodash-es'
import { useDownload } from '../data/download.js'
import { useResultTracking } from '../api/useResultTracking.js'
import { useFormSubmissionData } from '../utils/useFormSubmissionData.js'

const getSrc = () => {
  return (
    document
      .querySelector('[data-bdtl="finish-root__file-iframe"]')
      ?.getAttribute('src') || ''
  )
}

const srcTemplate = template(getSrc())

export default defineComponent({
  template: getTemplate({
    templateRoot: 'finish-root',
    withAttrs: {
      'finish-root__file-iframe': {
        ':src': 'src',
      },
    },
  }),
  setup() {
    const { fileContent } = useDownload()
    const src = computed(() => {
      return srcTemplate({
        fileContent: encodeURIComponent(fileContent.value),
        currentDate: new Date().toISOString().split('T')[0],
      })
    })

    const { trackResult } = useResultTracking()
    useFormSubmissionData({
      src,
      onSubmit: trackResult,
    })
    return {
      src,
    }
  },
})
