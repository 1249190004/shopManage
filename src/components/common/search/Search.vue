<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <el-input placeholder="请输入内容" v-model="query" clearable @clear="btnClick">
        <el-button slot="append" icon="el-icon-search" @click="btnClick"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addUser"><slot>添加用户</slot></el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        query: ''
      }
    },
    methods: {
      btnClick(){
        this.$emit('btnClick',this.query)
      },
      addUser(){
        this.$emit('addUser')
      }
    }
  }
</script>

<style scoped>

</style>
