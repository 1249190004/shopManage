<template>
  <div class="el-header">
    <div>
      <img src="../../assets/img/timg.jpg" alt="">
      <span>电商系统管理平台</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
  export default {
    name: "HomeHeader",
    methods: {
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-header {
    display: flex;
    /*padding: 0;*/
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #ffffff;
    width: 100%;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;


      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      span {
        margin-left: 15px;
      }
    }
  }
</style>
