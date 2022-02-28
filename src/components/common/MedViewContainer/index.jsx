import './index.less'
import MedHeader from './../MedHeader'
import {
  getClass,
  getStyle,
  initDefaultProps,
  getListeners,
  getOptionProps
} from '../../_utils/props-util'
const selfProps = (defaultProps = {}) => {
  return initDefaultProps(
    {
      ...MedHeader.props
    },
    defaultProps
  )
}
export default {
  name: 'MedViewContainer',
  inheritAttrs: false,
  components: { MedHeader },
  props: selfProps({}),
  methods: {
    onClickLeft() {
      const obj = getListeners(this)
      if (obj && obj.backClick) {
        obj.backClick()
      } else {
        this.$router.go(-1)
      }
    }
  },
  render() {
    const { $attrs, $scopedSlots } = this
    const TProps = {
      props: getOptionProps(this),
      on: {
        ...getListeners(this),
        backClick: this.onClickLeft
      },
      attrs: $attrs,
      class: getClass(this),
      style: getStyle(this),
      scopedSlots: $scopedSlots
    }
    const bodySlots = Object.keys(this.$slots).map(slot => {
      if (slot === 'default') return this.$slots[slot]
      return <template slot={slot}>{this.$slots[slot]}</template>
    })
    return (
      <div
        class={{
          'med-view-container-wrapper': true
        }}
      >
        <med-header {...TProps} />
        {bodySlots}
      </div>
    )
  }
}
