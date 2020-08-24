<template>
  <div>
    <BreadCrumb>
      <span slot="first">权限管理</span>
      <span slot="second">权限列表</span>
    </BreadCrumb>
    <Card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </Card>
  </div>
</template>

<script>
  import BreadCrumb from "../../components/common/breadCrumb/BreadCrumb";
  import Card from "../../components/common/card/Card";

  import {power} from "../../network/users"

  export default {
    name: "Rights",
    components: {
      BreadCrumb,
      Card
    },
    data() {
      return {
        // 权限列表
        rightsList: []
      }
    },
    created() {
      // 获取所有的权限
      this.getRightsList()
    },
    methods: {
      // 获取权限列表
      async getRightsList() {
        const {data: res} = await power()
        if (res === null) {
          return this.$message.error('获取权限列表失败！')
        }

        this.rightsList = res
      }
    }
  }
</script>

<style scoped>

</style>
