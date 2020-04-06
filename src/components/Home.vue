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
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button " @click="toggleCaollapse()">|||</div>
        <!-- 侧边栏页面区域 -->
        <el-menu :default-active="activePath" :router="true" :collapse="isCollapse" :collapse-transition=false background-color="#333744" text-color="#fff" active-text-color="#ffd04b" unique-opened>
          <!-- 一级菜单区 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i :class="iocnObj[item.id]"></i>
              <span v-text="item.authName">导航一</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subitem.path"
              v-for="(subitem) in item.children"
              :key="subitem.id"
              @click="savaStatus('/'+subitem.path)"
            >
              <!-- 二级菜单模板区 -->
              <template slot="title">
                <!-- 二级菜单图标 -->
                <i class="el-icon-s-grid"></i>
                <span v-text="subitem.authName">导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <p>用来显示hone子路有种的组件组件</p>
        <!-- 路由占位符 -->
        <router-view>谁谁谁</router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // 左侧菜单数据
      activePath:'',
      isCollapse: false,
      menuList: [],
      iocnObj: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      }
    };
  },
  components: {},
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.message.error(res.meta.msg);
      this.menuList = res.data;
      console.log(res);
    },
    toggleCaollapse(){
        this.isCollapse=!this.isCollapse
    },
    // 保存链接激活状况
    savaStatus(activePath){
      window.sessionStorage.setItem("activePath",activePath)
      this.activePath=activePath
    }
  }
};
</script>

<style lang="less" scoped>
.iconfont{
  margin-right: 10px;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #333744;
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
  background-color: #333744;
  position: relative;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #fff;
  position: relative;
}
.toggle-button{
  background-color: rgb(94, 94, 61);
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
