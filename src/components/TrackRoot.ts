import { PropType, defineComponent } from 'vue'
import { getTemplate } from './getTemplate'
import TrackPoint from './TrackPoint'
import { TrackPointType, useTrackPoints } from '../data/trackPoints'
import { useQuestions } from '../data/questions'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'track-root',
    templateInjects: {
      '&': /* html */ `
        <template v-for="(trackPoint, index) in trackPoints">
          <track-point 
            :track-point="trackPoint" 
            :with-track="isLastTrackPoint(index) ? undefined : isTrackDone(index) ? 'done' : 'open'"
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
        .every((trackPoint) => trackPoint.status === 'done')

    const isLastTrackPoint = (index: number) =>
      index === trackPoints.value.length - 1

    return {
      isTrackDone,
      isLastTrackPoint,
      trackPoints,
      setCurrentQuestionIndex,
    }
  },
  components: {
    TrackPoint,
  },
})
