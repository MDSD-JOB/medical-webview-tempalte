<template>
  <div class="hello-index-wrapper">
    Hello,World!
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'task',
      isLoaded: false
    }
  },
  created() {
    this.gg()
  },
  methods: {
    async gg() {
      await console.log(111)
    }
  }
}
</script>

<style lang="less" scoped>
.hello-index-wrapper {
  width: 100%;
}
</style>
