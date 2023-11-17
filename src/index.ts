import { createApp, ref } from 'vue'
import TrackRoot from './components/TrackRoot.ts'
import { getTemplate } from './components/getTemplate.ts'

const getTrackPointsData = () => {
  const trackPointElements = document.querySelectorAll(
    '[data-bdtl|="track-point"]'
  )
  const trackPointData = [...trackPointElements].map((element, index) => {
    const name = element
      .querySelector('[data-bdtl="track-point__name"]')
      ?.textContent?.trim()
    const number = element
      .querySelector('[data-bdtl="track-point__number"]')
      ?.textContent?.trim()
    return {
      name,
      number,
      status: (['done', 'current'][index] || 'open') as
        | 'open'
        | 'current'
        | 'done',
    }
  })
  return trackPointData
}

const initialTrackPoints = getTrackPointsData()

createApp({
  components: {
    TrackRoot,
  },
  setup() {
    const trackPoints = ref(initialTrackPoints)
    return {
      trackPoints,
    }
  },
  template: getTemplate({
    templateRoot: '#bdtl-app',
    shouldSkipRoot: true,
    templateReplaces: {
      'track-root': /* html */ `
        <track-root :track-points="trackPoints" />
      `,
    },
  }),
}).mount('#bdtl-app')
