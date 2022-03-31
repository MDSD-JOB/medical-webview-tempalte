import './index.less'
import T from 'vant/es/datetime-picker'
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
      label: {
        type: String,
        default: '选择时间'
      },
      placeholder: {
        type: String,
        default: '请选择时间'
      },
      value: {
        type: [Date, String],
        default: ''
      },
      dateTime: {
        require: true,
        type: [Date, String]
      },
      required: {
        required: false,
        type: Boolean
      },
      rules: {
        required: false,
        type: [Object, Array]
      },
      disabled: {
        required: false,
        type: Boolean
      },
      type: {
        required: false,
        default: 'datetime'
      },
      formatter: {
        required: false,
        default: 'YYYY-MM-DD HH:mm'
      },
      minDate: {
        required: false,
        type: [String, Date]
      },
      maxDate: {
        required: false,
        type: [String, Date]
      },
      hintType: {
        type: String,
        default: ''
      },
      hintMessage: {
        type: String,
        default: ''
      },
      clearable: {
        type: Boolean,
        default: false
      }
    },
    defaultProps
  )
}
export default {
  TreeNode: { ...T.TreeNode, name: 'MedDatePickerNode' },
  name: 'MedDatePicker',
  inheritAttrs: false,
  props: selfProps({}),
  model: {
    prop: 'dateTime',
    event: '_change'
  },
  data() {
    return {
      show: false,
      childTime: this.dateTime
    }
  },
  computed: {
    dateValue() {
      return this.string2Date(this.value)
    },
    _minDate() {
      if (!this.minDate) return undefined
      return this.$moment(this.minDate).toDate()
    },
    _maxDate() {
      if (!this.maxDate) return undefined
      return this.$moment(this.maxDate).toDate()
    }
  },
  updated() {
    this.childTime = this.dateTime
  },
  methods: {
    showPicker() {
      if (!this.disabled) {
        this.show = true
      }
    },
    date2String(date) {
      return this.$moment(date).format(this.formatter)
    },
    string2Date(str) {
      return str ? new Date(str) : new Date()
    },
    handleShowList() {
      if (!this.readonly && !this.disabled) {
        this.show = true
      }
    },
    onCancel() {
      this.show = false
    },
    onConfirm(val) {
      this.show = false
      this.childTime = this.date2String(val)
    },
    onChange(val) {
      this.$emit('change', val)
    },
    formatters(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else if (type === 'day') {
        return `${val}日`
      } else if (type === 'hour') {
        return `${val}时`
      } else if (type === 'minute') {
        return `${val}分`
      }
      return val
    },
    showHint(val) {
      this.$refs.hintField.showHint(val)
    }
  },
  watch: {
    childTime(val) {
      this.$emit('changeTime', val)
      this.$emit('_change', val)
    }
  },
  render() {
    const { $attrs, $scopedSlots } = this
    const TProps = {
      class: getClass(this),
      style: getStyle(this),
      props: {
        required: this.required,
        label: this.label,
        placeholder: this.placeholder,
        disabled: this.disabled,
        rules: this.rules,
        hintType: this.hintType,
        hintMessage: this.hintMessage,
        clearable: this.clearable
      },
      on: {
        click: this.showPicker
      }
    }
    const ChildProps = {
      props: {
        ...getOptionProps(this),
        minDate: this._minDate,
        maxDate: this._maxDate,
        filter: this.filter,
        formatter: this.formatters,
        value: this.dateValue
      },
      on: {
        ...getListeners(this),
        cancel: this.onCancel,
        confirm: this.onConfirm,
        change: this.onChange
      },
      attrs: $attrs,
      scopedSlots: $scopedSlots
    }
    const bodySlots = Object.keys(this.$slots).map(slot => {
      if (slot === 'default') return this.$slots[slot]
      return <template slot={slot}>{this.$slots[slot]}</template>
    })
    return (
      <div
        class={{
          'med-datepicker-wrapper': true
        }}
        {...TProps}
      >
        <med-hint-field
          ref="hintField"
          readonly
          class="no-link-arrow"
          v-model={this.childTime}
          {...TProps}
        >
          {bodySlots}
        </med-hint-field>

        <van-popup
          class="med-datepicker-popup"
          get-container="body"
          position="bottom"
          v-model={this.show}
        >
          <van-datetime-picker
            type={this.type}
            title="选择完整时间"
            item-height={'1.2rem'}
            visible-item-count={5}
            {...ChildProps}
          />
        </van-popup>
      </div>
    )
  }
}
