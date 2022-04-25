import './index.less'
import {
  getClass,
  getStyle,
  initDefaultProps,
  getListeners,
  getOptionProps
} from '../../_utils/props-util'
import MedHintFiled from '../MedHintField'

const selfProps = (defaultProps = {}) => {
  return initDefaultProps(
    {
      ...MedHintFiled.props,
      unit: {
        type: String,
        required: true,
        default: '单位'
      },
      scale: {
        type: [String, Number],
        required: false
      },
      min: {
        type: [String, Number],
        required: false
      },
      max: {
        type: [String, Number],
        required: false
      }
    },
    defaultProps
  )
}
export default {
  name: 'MedTextField',
  inheritAttrs: false,
  components: {
    MedHintFiled
  },
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
    showHint(val) {
      this.errorMessages = val || ''
    },
    inputHandler(value) {
      const valArr = value.split('.')
      if (this.scale !== undefined) {
        if (valArr.length > 1) {
          let pointLength = valArr[1].length
          pointLength =
            Number(this.scale) > pointLength ? pointLength : Number(this.scale)
          if (Number(this.scale) > 0) {
            value =
              +valArr[0] +
              (valArr.length > 1 ? `.${valArr[1].substr(0, pointLength)}` : '')
          } else {
            value = +valArr[0] + ''
          }
        } else {
          value = +value + ''
        }
        this.$emit('_change', value)
      }
      if (this.max !== undefined) {
        value = Math.min(value, Number(this.max))
        this.$emit('_change', value)
      }
      if (this.min !== undefined) {
        value = Math.max(value, Number(this.min))
        this.$emit('_change', value)
      }
    }
  },
  watch: {
    fieldValue(val) {
      this.$emit('_change', Number(val))
    }
  },
  render() {
    const TProps = {
      class: getClass(this),
      style: getStyle(this)
    }
    const ChildProps = {
      attrs: this.$attrs,
      props: {
        ...getOptionProps(this)
      },
      on: {
        ...getListeners(this),
        input: this.inputHandler
      }
    }
    const bodySlots = Object.keys(this.$slots).length
      ? Object.keys(this.$slots).map(slot => {
          if (slot === 'default') {
            return <template slot={'right-icon'}>{this.$slots[slot]}</template>
          }
          return <template slot={slot}>{this.$slots[slot]}</template>
        })
      : [<template slot={'right-icon'}>{this.unit}</template>]
    return (
      <div
        class={{
          'med-text-field-wrapper': true
        }}
        {...TProps}
      >
        <med-hint-field
          class="no-link-arrow"
          v-model={this.fieldValue}
          {...ChildProps}
        >
          {bodySlots}
        </med-hint-field>
      </div>
    )
  }
}
