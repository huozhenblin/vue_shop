<template>
  <div class="page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视卡片图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区 -->
      <el-row :gutter="15">
        <el-col :span="7">
          <el-input clearable placeholder="请输入内容" @clear="getUerList()" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getUerList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column label="状态" width="180">
          <template v-slot:default="userList">
            <div>
              <el-switch
                v-model="userList.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="userStateChanged(userList.row)"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot:default="userList">
            <div>
              <!-- 编辑按钮 -->
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
                @click="showEditDialog(userList.row.id)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-button
                size="small"
                @click="removeUserbyId(userList.row.id)"
                type="danger"
                icon="el-icon-delete"
              ></el-button>
              <!-- 分配角色按钮 -->
              <el-tooltip
                :enterable="false"
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
              >
                <el-button size="small" type="warning" icon="el-icon-setting"></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" @close="resetForm()" :visible.sync="dialogVisible" width="30%">
      <!-- 主题区 -->
      <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="提示" @close="editDialogClose()" :visible.sync="EditdialogVisible" width="50%">
      <!-- 用户修改主体区 -->
      <el-form :model="editForm" :rules="editFormrules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部提交区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    // 自定义表格验证
    // var checkEmail = (rule, value, callback) => {};
    // var checkMobile = (rule, value, callback) => {
    //   if (value.length == 11) {
    //     callback();
    //   }

    //   return callback(new Error("请输入11手机号"));
    // };

    return {
      // 添加用户的参数对象
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 添加表单的验证处理规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: checkMobile, trigger: "blur" }
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      },
      // 控制对话框是否显示
      dialogVisible: false,
      // 获取用户列表参数对象
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      // 控制用户修改对话框的变量
      EditdialogVisible: false,
      // 用户修改时的临时对象
      editForm: {},
      // 用户修改时的表单验证
      editFormrules: {
        email: [
          { required: false, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: false, message: "请输入手机号", trigger: "blur" }

          // { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUerList();
  },
  methods: {
    // 表单验证提交修改信息到后台
    submitUpdate() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        );
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("更新失败");
        }
        // 关闭对话框
        this.EditdialogVisible = !this.EditdialogVisible;
        // 刷新列表
        this.getUerList();
        //提示修改成功
        return this.$message.success("更新成功");
      });
    },
    // 更新弹窗的残留信息重置
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    // 用户更新消息时表格显示
    async showEditDialog(val) {
      // console.log('print id')
      // console.log(val)
      const { data: res } = await this.$http.get("users/" + val);
      if (res.meta.status !== 200) {
        return this.$message.error("用户不存在");
      }
      this.editForm = res.data;
      this.EditdialogVisible = true;
    },
    // 点击按钮添加用户
    addUser() {
      this.$refs.addFormRef.validate(async vaild => {
        if (vaild) {
          const { data: res } = await this.$http.post("users", this.addForm);
          if (res.meta.status !== 201) {
            return this.$message.error("添加用户失败");
          }
          console.log(res.data);
          return this.$message.success("添加用户成功");
        }
        return;
      });
    },

    // 重置用户新增数据
    resetForm() {
      this.$refs.addFormRef.resetFields();
    },
    // 监听开关状态
    async userStateChanged(userStatus) {
      console.log(userStatus);
      const { data: res } = await this.$http.put(
        `users/${userStatus.id}/state/${userStatus.mg_state}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("用户状态更新失败");
        userStatus.mg_status = !userStatus.mg_status;
      }
      console.log("添加成功返回的数据" + res.data);
      // res.data.
      this.$message.success("用户状态更新成功");
      // 关闭添加表单
      this.dialogVisible = false;
      // 刷新列表
      this.getUerList();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val;
      this.getUerList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pagenum = val;
      this.getUerList();
    },
    async getUerList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.userList = res.data.users;
      this.total = res.data.total;

      console.log(res);
    },
    // 根据id删除用户
    async removeUserbyId(id) {
      // console.log(id)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getUerList()

      // console.log("quedingshanchu")
      // console.log(confirm)
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
</style>
