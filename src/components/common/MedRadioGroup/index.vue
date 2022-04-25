<template>
  <van-radio-group
    class="med-radio-group"
    :direction="direction"
    :value="value"
    @input="handleChange"
    v-bind="$attrs"
  >
    <van-radio
      :class="`med-radio ${item.value === value ? 'med-radio-checked' : ''}`"
      v-for="item in dataSource"
      :key="item.value"
      :name="item.value"
      >{{ item.label || item.text }}</van-radio
    >
  </van-radio-group>
</template>

<script>
export default {
  name: 'MedRadioGroup',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    checkedColor: {
      type: String,
      default: '#d7dcff'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    input: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style lang="less" scoped>
.med-radio-group {
  // padding: 0 0.3rem 0 0.3rem;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  .med-radio {
    flex: 0 0 auto;
    margin: 0.14rem 0.17rem 0.14rem 0;
    font-size: 0.34rem;
    padding: 0.06rem 0.34rem;
    border-radius: 0.4rem;
    // overflow: hidden;
    // text-overflow: ellipsis;
    min-width: 2.1rem;
    max-width: 100%;
    display: block;
    /deep/ .van-radio__icon {
      display: none;
    }
    /deep/ .van-radio__label {
      // white-space: nowrap;
      color: #5e74fe;
      margin-left: 0;
    }
    &-checked {
      background-color: #d7dcff;
    }
  }
}
</style>
