<template>
  <div class="med-esign-wrapper">
    <div class="med-esign-main">
      <vue-esign ref="canvas" :width="w" :height="h"></vue-esign>
    </div>
    <div class="med-esign-btn flex-c-c">
      <van-button type="info" round @click="sumbit">确认</van-button>
      <van-button type="default" round @click="clear">清空</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vueEsign from 'vue-esign'
Vue.use(vueEsign)

export default {
  name: 'ESign',
  data() {
    return {
      sign: null,
      w: document.body.clientWidth,
      h: document.body.clientHeight
    }
  },
  created() {},
  methods: {
    // 将base64转换为blob
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    clear() {
      this.$refs.canvas.reset()
    },
    sumbit() {
      this.$refs.canvas
        .generate()
        .then(res => {
          const blob = this.dataURLtoBlob(res)
          const file = new window.File([blob], '签名.png', {
            type: 'image/png'
          })
          this.$emit('submit', file)
          this.clear()
        })
        .catch(() => {
          this.$dialog.alert({
            title: '提示',
            message: '请书写签名！'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.med-esign-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .med-esign-main {
    height: calc(100% - 182px);
    overflow: hidden;
  }
  .med-esign-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 1px solid #ccc;
    padding: 50px 0;
    .van-button {
      height: 80px;
      padding: 0 80px;
      margin: 0 20px;
      border-color: #5e74fe;
      &:nth-of-type(1) {
        background: #5e74fe;
      }
      &:nth-of-type(2) {
        color: #5e74fe;
      }
    }
  }
}
</style>
