<template>
  <div class="med-bp-field-wrapper">
    <med-hint-field v-bind="$props">
      <template #input-part>
        <van-row>
          <van-col :span="24" class="bp-field">
            <van-field
              v-model="highValue"
              :readonly="readonly"
              :disabled="disabled"
              input-align="left"
              placeholder="收缩压"
              @blur="onConfirm"
            >
            </van-field>
            <span class="split" :style="disabled ? { color: '#c8c9cc' } : {}">
              /
            </span>
            <van-field
              v-model="lowValue"
              :readonly="readonly"
              :disabled="disabled"
              input-align="left"
              placeholder="舒张压"
              @blur="onConfirm"
            >
            </van-field>
          </van-col>
        </van-row>
      </template>
      <template #right-icon>
        <i>mmHg</i>
      </template>
    </med-hint-field>
  </div>
</template>

<script>
import MedHintField from '../MedHintField/index.jsx'
export default {
  name: '',
  props: {
    ...MedHintField.props,
    bpValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'bpValue',
    event: '_change'
  },
  data() {
    return {
      show: false,
      highValue: '',
      lowValue: ''
    }
  },
  mounted() {
    const _bp = this.parseBpValue(this.bpValue)
    this.highValue = _bp.sbp
    this.lowValue = _bp.dbp
    this.$forceUpdate()
  },
  methods: {
    makeBpValue(sbp, dbp) {
      return sbp + '/' + dbp
    },
    parseBpValue(bp) {
      const _bp = { sbp: '', dbp: '' }
      if (!bp || bp === '') return _bp
      const arr = bp.split('/')
      if (!arr) return _bp
      if (arr.length > 0) _bp.sbp = arr[0]
      if (arr.length > 1) _bp.dbp = arr[1]
      return _bp
    },
    onConfirm() {
      const _bpValue = this.makeBpValue(this.highValue, this.lowValue)
      if (_bpValue !== this.bpValue) {
        this.$emit('_change', _bpValue)
        this.$emit('confirm', _bpValue)
      }
    }
  },
  watch: {
    highValue(val) {
      const _bpValue = this.makeBpValue(val, this.lowValue)
      this.$emit('change', _bpValue)
    },
    lowValue(val) {
      const _bpValue = this.makeBpValue(this.highValue, val)
      this.$emit('change', _bpValue)
    }
  }
}
</script>

<style lang="less" scoped>
.med-bp-field-wrapper {
  .bp-field {
    display: flex;
    align-items: center;

    .van-cell {
      padding: 0;
    }

    .split {
      padding: 0 10px;
    }
  }
}
</style>
