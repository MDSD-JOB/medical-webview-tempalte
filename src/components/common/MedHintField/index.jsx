import './index.less'
import T from 'vant/es/field/index'
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
      ...T.props,
      value: {
        type: [String, Number, Date],
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      link: {
        type: Boolean,
        default: false
      },
      linkIcon: {
        type: String,
        default: ''
      },
      hintType: {
        type: String,
        default: ''
      },
      hintMessage: {
        type: String,
        default: ''
      }
    },
    defaultProps
  )
}
export default {
  TreeNode: { ...T.TreeNode, name: 'MedHintFieldNode' },
  name: 'MedHintField',
  inheritAttrs: false,
  props: selfProps({}),
  data() {
    return {
      fieldValue: '',
      errorMessages: ''
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  methods: {
    switchElPosition() {
      if (this.hintType) {
        const icon = this.$el.querySelector('.van-field__left-icon')
        const label = this.$el.querySelector(
          '.van-cell__title.van-field__label'
        )

        icon && label && icon.before(label)
      }
    },
    linkClick() {
      this.$emit('link-click')
    },
    showHint(val) {
      this.errorMessages = val || ''
    }
  },
  mounted() {
    this.switchElPosition()
  },
  watch: {
    fieldValue(val) {
      this.$emit('_change', val)
      this.$emit('change', val)
    }
  },
  render() {
    const { $attrs, $scopedSlots } = this
    const TProps = {
      class: getClass(this),
      style: getStyle(this)
    }
    const ChildProps = {
      attrs: $attrs,
      props: {
        ...getOptionProps(this),
        placeholder: this.placeholder
          ? this.placeholder
          : '请填写' + (this.label || ''),
        isLink: this.link,
        rightIcon: this.linkIcon,
        leftIcon: this.hintType,
        errorMessage: this.errorMessages || this.hintMessage,
        clearable: this.clearable,
        clearTrigger: 'always'
      },
      on: {
        ...getListeners(this),
        'click-right-icon': this.linkClick
      },
      scopedSlots: $scopedSlots
    }
    const bodySlots = Object.keys(this.$slots).map(slot => {
      if (slot === 'default') return this.$slots[slot]
      if (slot === 'right-part') {
        return <template slot={'right-icon'}>{this.$slots[slot]}</template>
      }
      if (slot === 'input-part') {
        return <template slot={'input'}>{this.$slots[slot]}</template>
      }
      return <template slot={slot}>{this.$slots[slot]}</template>
    })

    const hideLinkArrow =
      this.link &&
      (!!this.linkIcon || Object.keys(this.$slots).includes('right-part'))

    return (
      <div
        class={{
          'med-hint-field-wrapper': true,
          'no-link-arrow': hideLinkArrow
        }}
        {...TProps}
      >
        <van-field {...ChildProps} v-model={this.fieldValue}>
          {bodySlots}
        </van-field>
      </div>
    )
  }
}
