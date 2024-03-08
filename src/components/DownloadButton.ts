import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate.js'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'download-button',
  }),
})
