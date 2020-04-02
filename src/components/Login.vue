<template>
  <div class="login_containner">
    <div class="login_box">
      <div class="avatar_box">
        <!-- 登录区标识图片 -->
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form
        ref="loginFormRef"
        :model="loginform"
        :rules="loginRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginform.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginform.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetFormFields">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      // 表单绑定对象
      loginform: {
        username: "",
        password: ""
      },
      // 表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "change" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击重置按钮
    resetFormFields() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        // 后端请求 账号密码是否正确
        const loh = await this.$http.post("login", this.loginform);
        console.log(loh);
        // console.log(loh.data.meta.status != 200)
        if (loh.data.meta.status != 200) return this.$message.error("登陆失败");
        this.$message.success("登陆成功");
        window.sessionStorage.setItem("token", loh.data.data.token);
        this.$router.push("/home");
      });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.login_containner {
  background-color: aqua;
  height: 100%;
}
.login_box {
  width: 500px;
  height: 300px;
  background-color: #fff;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid steelblue;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>

