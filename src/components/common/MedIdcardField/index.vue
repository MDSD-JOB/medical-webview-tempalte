<template>
  <div class="med-idcard-field-wrapper">
    <med-hint-field v-bind="$props" v-model="fieldValue">
      <template #right-icon>
        <van-icon name="scan" @click="onIconClick" v-if="showScan" />
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
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showScan: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'value',
    event: '_change'
  },
  data() {
    return {
      fieldValue: this.value
    }
  },
  mounted() {
    this.fieldValue = this.value
  },
  computed: {},
  methods: {
    // 1:二维码,2:身份证,3:医保卡
    onIconClick() {
      this.$bridge.callhandler('scanner', { type: ['2'] }, data => {
        if (!data) this.$toast('无效的扫描数据')
        const result = JSON.parse(data)
        if (result && result.type === '2') {
          this.$emit('input', result.words_result.identity)
          this.$emit('_change', result.words_result.identity)
          this.$emit('change', result.words_result.identity)
          this.$emit('scanned', result.words_result)
        } else {
          this.$toast('不支持的扫码类型')
        }
      })
    }
  },
  watch: {
    fieldValue(val) {
      this.$emit('_change', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="less" scoped>
.med-idcard-field-wrapper {
  .van-field__right-icon .van-icon {
    font-size: 48px !important;
  }
}
</style>
