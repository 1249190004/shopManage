<template>
  <div>
    <BreadCrumb>
      <span slot="first">用户管理</span>
      <span slot="second">用户列表</span>
    </BreadCrumb>

    <Card>
      <Table/>
    </Card>
  </div>
</template>

<script>
  import BreadCrumb from "../../components/common/breadCrumb/BreadCrumb";
  import Card from "../../components/common/card/Card";
  import Table from "../../components/common/table/Table";

  export default {
    name: "Users",
    components: {
      BreadCrumb,
      Card,
      Table
    }
  }
</script>

<style scoped>

</style>
