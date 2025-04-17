import { PropType, defineComponent } from 'vue'
import { TrackPointType } from '../data/trackPoints.js'
import { getTemplate } from './getTemplate.js'
import TrackPointDoneHtml from './TrackPointDone.html'
import TrackPointCurrentHtml from './TrackPointCurrent.html'
import TrackPointOpenHtml from './TrackPointOpen.html'
import TrackTrackOpenHtml from './TrackTrackOpen.html'
import TrackTrackDoneHtml from './TrackTrackDone.html'

type TrackPointVariant = 'open' | 'current' | 'done'

const trackPointFallbackHtmlMap = {
  open: TrackPointOpenHtml,
  current: TrackPointCurrentHtml,
  done: TrackPointDoneHtml,
} satisfies Record<TrackPointVariant, string>

const createTrackPointVariant = (variant: TrackPointVariant) =>
  defineComponent({
    template:
      getTemplate({
        templateRoot: `track-point--${variant}`,
        dataInjects: {
          'track-point__number': 'number',
          'track-point__name': 'name',
        },
      }) || trackPointFallbackHtmlMap[variant],
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

type TrackTrackVariant = 'open' | 'done'

const trackTrackFallbackHtmlMap: Record<TrackTrackVariant, string> = {
  open: TrackTrackOpenHtml,
  done: TrackTrackDoneHtml,
}

const createTrackTrackVariant = (variant: TrackTrackVariant) =>
  defineComponent({
    template:
      getTemplate({
        templateRoot: `track-track--${variant}`,
      }) || trackTrackFallbackHtmlMap[variant],
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
