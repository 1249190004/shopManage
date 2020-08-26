<template>
  <div>
    <BreadCrumb>
      <span slot="first">商品管理</span><span slot="second">商品列表</span>
    </BreadCrumb>
    <Card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="140px">
          <template slot-scope="scope">
            {{scope.row.add_time | showDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editData(scope.row.goods_id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="removeById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </Card>

    <el-dialog title="提示" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form ref="editFormRef" :model="editForm" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="editForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="editForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="editForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClosed">取 消</el-button>
        <el-button type="primary" @click="editById">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import BreadCrumb from "../../components/common/breadCrumb/BreadCrumb";
  import Card from "../../components/common/card/Card";

  import {goods} from "../../network/users";

  import {formatDate} from "../../common/utils";

  export default {
    name: "List",
    components: {
      BreadCrumb,
      Card
    },
    data() {
      return {
        // 查询参数对象
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 5
        },
        // 商品列表
        goodslist: [],
        // 总数据条数
        total: 0,
        editDialogVisible: false,
        editForm: {
          id: '',
          goods_name: '',
          goods_cat:'',
          goods_price: '',
          goods_weight: ''
        }
      }
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        const {data: res} = await goods(this.queryInfo)
        if (res === null) {
          return this.$message.error('获取商品列表失败！')
        }
        // this.$message.success('获取商品列表成功！')
        this.goodslist = res.goods
        // console.log(this.goodslist)
        this.total = res.total
      },
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize
        this.getGoodsList()
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        this.getGoodsList()
      },
      async editData(id) {
        const {data: res} = await this.$http.get('http://timemeetyou.com:8889/api/private/v1/goods/' + id)
        this.editForm.id = id
        this.editForm.goods_name = res.data.goods_name
        this.editForm.goods_cat = res.data.goods_cat
        this.editForm.goods_price = res.data.goods_price
        this.editForm.goods_weight = res.data.goods_weight
        this.editDialogVisible = true
      },
      async editById() {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return
          const {data: res} = await this.$http.put('http://timemeetyou.com:8889/api/private/v1/goods/' + this.editForm.id, {
            goods_name: this.editForm.goods_name,
            goods_cat:this.editForm.goods_cat,
            goods_price: this.editForm.goods_price,
            goods_number: 1,
            goods_weight: this.editForm.goods_weight
          })
          if (res.meta.status !== 200) {
            return this.$message.error('修改参数失败！')
          }

          this.$message.success('修改参数成功！')
          await this.getGoodsList()
          this.editeditDialogVisible = false
        })

      },
      editDialogClosed() {
        this.editDialogVisible = false
        this.$refs.editFormRef.resetFields()
      },
      async removeById(id) {
        const confirmResult = await this.$confirm(
          '此操作将永久删除该商品, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch(err => err)

        if (confirmResult !== 'confirm') {
          return this.$message.info('已经取消删除！')
        }
        const {data: res} = await this.$http.delete('http://timemeetyou.com:8889/api/private/v1/goods/' + id)
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败！')
        }

        this.$message.success('删除成功！')
        await this.getGoodsList()
      },
      goAddPage(){
        this.$router.push('/goods/add')
      }
    },
    filters: {
      showDate(time) {
        const date = new Date(time * 1000)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
</style>
