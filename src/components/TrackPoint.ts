import { PropType, defineComponent } from 'vue'
import TrackPointDone from './TrackPointDone'
import TrackPointCurrent from './TrackPointCurrent'
import TrackPointOpen from './TrackPointOpen'
import TrackTrackDone from './TrackTrackDone'
import TrackTrackOpen from './TrackTrackOpen'
import { TrackPointType } from '../data/trackPoints'

export default defineComponent({
  template: /* html */ `
    <track-point-open 
      v-if="trackPoint.status === 'open'"
      :number="trackPoint.number"
      :name="trackPoint.name" @click.native="$emit('click')"
    />
    <track-point-current 
      v-if="trackPoint.status === 'current'"
      :number="trackPoint.number"
      :name="trackPoint.name"
      @click.native="$emit('click')"
    />
    <track-point-done
      v-if="trackPoint.status === 'done'"
      :number="trackPoint.number"
      :name="trackPoint.name"
      @click.native="$emit('click')"
    />
    <template v-if="withTrack">
      <track-track-open v-if="withTrack === 'open'" />
      <track-track-done v-if="withTrack === 'done'" />
    </template>
  `,
  emits: ['click'],
  props: {
    trackPoint: {
      type: Object as PropType<TrackPointType>,
      required: true,
    },
    withTrack: {
      type: String as PropType<'done' | 'open'>,
      required: false,
    },
  },
  components: {
    TrackPointOpen,
    TrackPointCurrent,
    TrackPointDone,
    TrackTrackOpen,
    TrackTrackDone,
  },
  setup(props) {
    return {}
  },
})
