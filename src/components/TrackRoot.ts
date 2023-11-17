import { PropType, defineComponent } from 'vue'
import { getTemplate } from './getTemplate'
import { TrackPointType, default as TrackPoint } from './TrackPoint'

export default defineComponent({
  template: getTemplate({
    templateRoot: 'track-root',
    templateInjects: {
      '&': /* html */ `
        <template v-for="(trackPoint, index) in trackPoints">
          <track-point 
            :track-point="trackPoint" 
            :with-track="isLastTrackPoint(index) ? undefined : isTrackDone(index) ? 'done' : 'open'"
          />
        </template>
      `,
    },
  }),
  props: {
    trackPoints: {
      type: Array as PropType<TrackPointType[]>,
      required: true,
    },
  },
  methods: {
    isTrackDone(index: number) {
      return this.trackPoints
        .slice(0, index)
        .every((trackPoint) => trackPoint.status === 'done')
    },
    isLastTrackPoint(index: number) {
      return index === this.trackPoints.length - 1
    },
  },
  components: {
    TrackPoint,
  },
})
