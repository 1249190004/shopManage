<template>
  <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
    <!-- 内容主体区域 -->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
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
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import {checkEmail, checkMobile} from "../../../../common/rules";

  export default {
    name: "TableDialogAddUser",
    data() {
      return {
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 5
        },
        userList: [],
        total: 0,
        addDialogVisible: false,
        addForm: {
          username: ''
        },
        addFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {
              min: 3,
              max: 10,
              message: '用户名的长度在3~10个字符之间',
              trigger: 'blur'
            }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
              min: 6,
              max: 15,
              message: '用户名的长度在6~15个字符之间',
              trigger: 'blur'
            }
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: checkEmail(), trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkMobile(), trigger: 'blur'}
          ]
        }
      }
  }
</script>

<style scoped>

</style>
