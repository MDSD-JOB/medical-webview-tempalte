<template>
  <div class="med-select-field-wrapper">
    <van-field v-bind="$props" v-model="cValue">
      <template #right-icon>
        <div class="med-select-button">
          <van-button @click="onSelectClick">候选项</van-button>
          <van-popover
            v-model="showPopover"
            placement="left-start"
            :actions="list"
            close-on-click-action
            @select="onSelect"
            get-container="body"
          />
          <!-- <van-action-sheet
            v-model="showPopover"
            :actions="list"
            @select="onSelect"
          /> -->
        </div>
      </template>
    </van-field>
  </div>
</template>

<script>
import T from 'vant/es/field/index'
export default {
  name: 'MedSelectField',
  inheritAttrs: false,
  props: {
    ...T.props,
    fValue: {
      require: true,
      type: [String, Number, Object]
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
      cValue: this.fValue,
      showPopover: false
    }
  },
  methods: {
    onSelect(action) {
      this.cValue = action.name
      this.unitKey = action
      this.showPopover = false
    },
    onSelectClick() {
      this.showPopover = true
    }
  },
  watch: {
    cValue(val) {
      this.$emit('_change', val)
      this.$emit('change', { ...this.unitKey })
    }
  }
}
</script>

<style lang="less" scoped>
.med-select-field-wrapper {
  /deep/ .van-field__right-icon {
    padding: 0;
    .med-select-button {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .van-button {
        border: none;
        border-radius: 0;
        border-left: 1px solid rgb(245, 243, 243);
        padding: 10px 20px;
        line-height: 1;
        height: auto;
      }
    }
  }
}
</style>
