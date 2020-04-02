<template>
  <div class="page">
      <h1>home组件</h1>
      <el-button type="info" @click="loginout">退出</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    loginout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
