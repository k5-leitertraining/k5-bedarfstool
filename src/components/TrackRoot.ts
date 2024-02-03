import { defineComponent } from 'vue'
import { getTemplate } from './getTemplate'
import TrackPoint from './TrackPoint'
import { useTrackPoints } from '../data/trackPoints'
import { useQuestions } from '../data/questions'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'track-root',
    templateInjects: {
      '&': /* html */ `
        <template v-for="(trackPoint, index) in trackPoints">
          <track-point 
            :track-point="trackPoint" 
            :with-track="isFirstTrackPoint(index) ? undefined : isTrackDone(index) ? 'done' : 'open'"
            @click="setCurrentQuestionIndex(index)"
          />
        </template>
      `,
    },
  }),
  setup() {
    const { trackPoints } = useTrackPoints()
    const { setCurrentQuestionIndex } = useQuestions()
    const isTrackDone = (index: number) =>
      trackPoints.value
        .slice(0, index + 1)
        .every(
          (trackPoint) =>
            trackPoint.status === 'done' || trackPoint.status === 'current'
        )

    const isFirstTrackPoint = (index: number) => index === 0

    return {
      isTrackDone,
      isFirstTrackPoint,
      trackPoints,
      setCurrentQuestionIndex,
    }
  },
  components: {
    TrackPoint,
  },
})
