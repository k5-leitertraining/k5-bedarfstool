import { PropType, defineComponent } from 'vue'
import { TrackPointType } from '../data/trackPoints'
import { getTemplate } from './getTemplate'

const createTrackPointVariant = (variant: string) =>
  defineComponent({
    template: getTemplate({
      templateRoot: `track-point--${variant}`,
      dataInjects: {
        'track-point__number': 'number',
        'track-point__name': 'name',
      },
    }),
    props: {
      number: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  })

const TrackPointOpen = createTrackPointVariant('open')
const TrackPointCurrent = createTrackPointVariant('current')
const TrackPointDone = createTrackPointVariant('done')

const createTrackTrackVariant = (variant: string) =>
  defineComponent({
    template: getTemplate({
      templateRoot: `track-track--${variant}`,
    }),
  })

const TrackTrackOpen = createTrackTrackVariant('open')
const TrackTrackDone = createTrackTrackVariant('done')

export default defineComponent({
  template: /* html */ `
    <template v-if="withTrack">
      <track-track-open v-if="withTrack === 'open'" />
      <track-track-done v-if="withTrack === 'done'" />
    </template>
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
