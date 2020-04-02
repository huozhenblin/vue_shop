<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header class="info">
      <div class="page">
        <h1>home组件</h1>
        <el-button type="info" @click="loginout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 主体侧边栏 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 右侧内容主题 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
