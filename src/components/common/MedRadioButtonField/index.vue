<template>
  <div class="med-radio-button-field-wrapper">
    <med-hint-field v-bind="$props">
      <template #input-part>
        <van-radio-group
          v-model="checked"
          :disabled="disabled"
          :readonly="readonly"
        >
          <van-radio
            v-for="item in selectOptions"
            :key="item.value"
            :name="item.value"
          >
            {{ item.label }}
          </van-radio>
        </van-radio-group>
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
    selectOptions: {
      type: Array,
      default: () => []
    },
    selectedValue: {
      type: String
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
    prop: 'selectedValue',
    event: '_change'
  },
  data() {
    return {
      checked: this.selectedValue
    }
  },
  computed: {},
  methods: {},
  watch: {
    checked(val) {
      this.$emit('_change', val)
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="less" scoped>
.med-radio-button-field-wrapper {
  /deep/.van-radio-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .van-radio {
      margin-right: 20px;

      .van-radio__icon {
        width: 0;
        height: 0;
        .van-icon {
          width: 0;
          height: 0;
          display: none;
          &:before {
            display: none;
          }
        }
        &.van-radio__icon--checked {
          width: 0;
          height: 0;
        }

        &.van-radio__icon--checked + .van-radio__label {
          background: #5e74fe;
          color: #fff;
        }
      }

      .van-radio__label {
        border: 1px solid #dadada;
        padding: 5px 20px;
        border-radius: 44px;
        margin: 0;
      }
    }
  }
}
</style>
