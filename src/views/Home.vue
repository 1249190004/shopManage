<template>
  <el-container>
    <el-header>
      <HomeHeader/>
    </el-header>

    <el-container>
      <el-aside :width="getToggleWidth">
        <HomeAside @itemWidth="itemWidth"/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HomeHeader from "./childCopms/HomeHeader";
  import HomeAside from "./childCopms/HomeAside";

  export default {
    name: "Home",
    data() {
      return {
        isToggle: false
      }
    },
    components: {
      HomeHeader,
      HomeAside
    },
    computed: {
      getToggleWidth() {
        return this.isToggle ? '64px' : '201px'
      }
    },
    methods: {
      itemWidth(isToggle) {
        this.isToggle = isToggle
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
  }

  .el-aside {
    background-color: #333744;
  }

  .el-main {
    background-color: #EAEDF1;
  }

</style>
