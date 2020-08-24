<template>
 <div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item><slot name="first"></slot></el-breadcrumb-item>
     <el-breadcrumb-item><slot name="second"></slot></el-breadcrumb-item>
   </el-breadcrumb>
 </div>
</template>

<script>
  export default {
    name: "BreadCrumb"
  }
</script>

<style scoped>

</style>
