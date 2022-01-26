<template>
  <div class="med-unit-field-wrapper">
    <van-field v-bind="$props" v-model="cValue">
      <template #right-icon>
        <div class="med-datepicker-arrow">
          <span>{{ unit }}</span>
          <van-icon name="arrow-down" @click="showPopover = true" />
          <van-action-sheet
            v-model="showPopover"
            :actions="list"
            @select="onSelect"
          />
        </div>
      </template>
    </van-field>
  </div>
</template>

<script>
import T from 'vant/es/field/index'
export default {
  name: 'MedUnitField',
  inheritAttrs: false,
  props: {
    ...T.props,
    fValue: {
      require: true,
      type: [String, Object]
    },
    list: {
      require: true,
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'fValue',
    event: '_change'
  },
  data() {
    return {
      cValue: this.fValue.value || '',
      unit: this.fValue.unit || '',
      showPopover: false
    }
  },
  methods: {
    onSelect(action) {
      this.unit = action.name
      this.unitKey = action
      this.showPopover = false
    }
  },
  watch: {
    cValue(val) {
      this.$emit('_change', { value: val, unit: this.unit })
      this.$emit('change', { value: val, unit: this.unitKey })
    },
    unit() {
      this.$emit('_change', { value: this.cValue, unit: this.unit })
      this.$emit('change', { value: this.cValue, unit: this.unitKey })
    }
  }
}
</script>

<style lang="less" scoped>
.med-unit-field-wrapper {
  .med-datepicker-arrow {
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
      margin-right: 10px;
    }
  }
}
</style>
