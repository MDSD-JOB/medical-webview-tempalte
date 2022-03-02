<template>
  <div class="hello-index-wrapper">
    Hello,World!
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {}
  },
  created() {
    this.gg()
  },
  methods: {
    async gg() {
      // 请求接口DEMO
      // await this.$api.demo.getApiTmplate()
      // await this.$api.demo.getTmplate()
    }
  }
}
</script>

<style lang="less" scoped>
@import "@assets/styles/hello/index.less";
</style>
