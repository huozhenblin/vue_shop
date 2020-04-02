<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img
          style="width: 60px; height: 60px;background-color: #dcdfe6;"
          src="../assets/ig.jpg"
          alt
        />
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏页面区域 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="##DCDFE6"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 一级菜单区 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="1-4-1">
              <!-- 二级菜单模板区 -->
              <template slot="title">
                <!-- 二级菜单图标 -->
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
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
.home-container {
  height: 100%;
}
.el-header {
  background-color: #dcdfe6;
  position: relative;
  height: 70px !important;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: azure;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #909399;
  position: relative;
}
.el-main {
  background-color: #fff;
  position: relative;
}
</style>
