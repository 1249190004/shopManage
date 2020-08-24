<template>
  <div>
    <div class="toggle-button" @click="toggleClick">===</div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      :unique-opened="true"
      :collapse="isShow"
      :collapse-transition="false"
      :router="true"
      :default-active="getHighElement">
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>

        <el-menu-item :index="'/'+itemChild.path"
                      v-for="itemChild in item.children"
                      :key="itemChild.id">
          <i class="el-icon-menu"></i>
          <span>{{itemChild.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
  import {menus} from "../../network/menu";

  export default {
    name: "HomeAside",
    data() {
      return {
        menuList: [],
        iconsObj: {
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao'
        },
        isShow: false
      }
    },
    computed: {
      getHighElement(){
        return this.$route.path
      }
    },
    created() {
      this.getMenuList()
    },
    methods: {
      getMenuList() {
        menus().then(res => {
          if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
          this.menuList = res.data
        })
      },
      toggleClick() {
        this.isShow = !this.isShow
        this.$emit('itemWidth', this.isShow)
      }
    }
  }
</script>

<style lang="less" scoped>
  .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    color: #ffffff;
    text-align: center;
    line-height: 24px;
    letter-spacing: .2em;
    cursor: pointer;
  }

  .el-menu {
    width: 100%;
  }

  .iconfont {
    margin-right: 10px;
  }
</style>
