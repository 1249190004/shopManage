<template>
  <div>
    <Search @btnClick="getUsers" @addUser="addUser"/>
    <el-table :data="userList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" prop="username"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="电话" prop="mobile"></el-table-column>
      <el-table-column label="角色" prop="role_name"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip content="修改用户" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini" circle
                       @click="showEditDialog(scope.row.id)"></el-button>
          </el-tooltip>

          <el-tooltip content="删除用户" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" circle
                       @click="removeUserById(scope.row.id)"></el-button>
          </el-tooltip>

          <el-tooltip effect="dark" content="分配角色" placement="top" @click="setRole(scope.row)">
            <el-button type="warning" icon="el-icon-setting" size="mini" circle @click="setRole(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userList.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total.sync="total">
    </el-pagination>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username" disable>
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

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!--     分配角色的对话框-->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="setRoleDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>

  import {users, role} from '../../../network/users'

  import Search from "../search/Search";

  import {checkEmail, checkMobile} from "../../../common/rules";

  export default {
    name: "Table",
    components: {
      Search
    },
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
        editDialogVisible: false,
        setRoleDialogVisible: false,
        addForm: {
          username: ''
        },
        editForm: {},
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
        },
        userInfo: '',
        rolesList: [],
        selectedRoleId: ''
      }
    },
    created() {
      this.getUsersList()
    },
    methods: {
      getUsersList() {
        users(this.queryInfo).then(res => {
          if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
          this.userList = res.data.users
          this.total = res.data.total
        })
      },
      handleSizeChange(newNum) {
        this.queryInfo.pagesize = newNum
        this.getUsersList()
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        this.getUsersList()
      },
      getUsers(query) {
        this.queryInfo.query = query
        this.getUsersList()
      },
      addUser() {
        this.addDialogVisible = true
      },
      // 监听添加用户对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
      },
      editDialogClose() {
        this.$refs.addFormRef.resetFields()
      },
      async removeUserById(id) {
        // 弹框询问用户是否删除数据
        const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        // 如果用户确认删除，则返回值为字符串 confirm
        // 如果用户取消了删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }

        const {data: res} = await this.$http.delete('http://timemeetyou.com:8889/api/private/v1/users/' + id)

        if (res.meta.status !== 200) {
          return this.$message.error('删除用户失败！')
        }

        this.$message.success('删除用户成功！')
        this.getUsersList()
      },
      editUserInfo() {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return
          // 发起修改用户信息的数据请求
          const {data: res} = await this.$http.put(
            'http://timemeetyou.com:8889/api/private/v1/users/' + this.editForm.id,
            {
              email: this.editForm.email,
              mobile: this.editForm.mobile
            }
          )

          if (res.meta.status !== 200) {
            return this.$message.error('更新用户信息失败！')
          }

          // 关闭对话框
          this.editDialogVisible = false
          // 刷新数据列表
          this.getUsersList()
          // 提示修改成功
          this.$message.success('更新用户信息成功！')
        })
      },
      async showEditDialog(id) {
        const {data: res} = await this.$http.get('http://timemeetyou.com:8889/api/private/v1/users/' + id)

        if (res.meta.status !== 200) {
          return this.$message.error('查询用户信息失败！')
        }

        this.editForm = res.data
        this.editDialogVisible = true
      },
      //需要优化(此处未封装axios)
      addUsers() {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return
          const {data: res} = await this.$http.post('http://timemeetyou.com:8889/api/private/v1/users', this.addForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加用户失败！')
          }
          this.$message.success('添加用户成功！')
          this.addDialogVisible = true
          this.getUsersList()
        })
      },
      //需要优化(此处未封装axios)
      async userStateChanged(userInfo) {
        const {data: res} = await this.$http.put(
          `http://timemeetyou.com:8889/api/private/v1/users/${userInfo.id}/state/${userInfo.mg_state}`
        )
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error('更新用户状态失败！')
        }
        this.$message.success('更新用户状态成功！')
      },
      async setRole(userInfo) {
        this.userInfo = userInfo
        const {data: res} = await role()
        if (res === null) {
          return this.$message.error('获取用户列表失败！')
        }
        this.rolesList = res
        // this.$message.success('获取用户列表成功！')
        this.setRoleDialogVisible = true
      },
      setRoleDialogClosed() {
        this.selectedRoleId = ''
        this.userInfo = {}
      },

      //后台接口设置权限，无法修改
      async saveRoleInfo() {
        if (!this.selectedRoleId) {
          return this.$message.error('请选择要分配的角色！')
        }
        const {data: res} = await this.$http.put(
          `http://timemeetyou.com:8889/api/private/v1/users/${this.userInfo.id}/role`,
          {
            rid: this.selectedRoleId
          }
        )

        if (res.meta.status !== 200) {
          return this.$message.error('更新角色失败！')
        }

        this.$message.success('更新角色成功！')
        this.getUsersList()
        this.setRoleDialogVisible = false
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
