import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'download-button',
  }),
})