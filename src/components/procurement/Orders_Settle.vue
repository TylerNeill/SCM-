<template>
  <!-- 采购了结 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Neworders' }">采购管理</el-breadcrumb-item>
            <el-breadcrumb-item>采购单了结</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:10px;">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="货到付款" name="1">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%">
            <el-table-column label="序号" type="index"  ></el-table-column>
            <el-table-column label="采购单编号" >
              <template slot-scope="scope">
                <span>{{scope.row.poId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" >
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="供应商名称" >
              <template slot-scope="scope">
                <span>{{scope.row.venderName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建用户" >
              <template slot-scope="scope">
                <span>{{scope.row.account}}</span>
              </template>
            </el-table-column>

            <el-table-column label="附加费用" >
              <template slot-scope="scope">
                <span>{{scope.row.tipFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="采购产品总价" >
              <template slot-scope="scope">
                <span>{{scope.row.productTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="采购单总价格">
              <template slot-scope="scope">
                <span>{{scope.row.poTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="付款方式">
              <template slot-scope="scope">
                <span v-if="show[scope.$index].payType==1">货到付款</span>
                <span v-else-if="show[scope.$index].payType==2">款到发货</span>
                <span v-else-if="show[scope.$index].payType==3">预付款到发货</span>
              </template>
            </el-table-column>

            <el-table-column label="最低预付款金额" >
              <template slot-scope="scope">
                <span>{{scope.row.prePayFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="处理状态" prop="status" >
              <template slot-scope="scope">
                <span v-if="show[scope.$index].status==1">新增</span>
                <span v-else-if="show[scope.$index].status==2">已收货</span>
                <span v-else-if="show[scope.$index].status==3">已付款</span>
                <span v-else-if="show[scope.$index].status==4">已了结</span>
                <span v-else-if="show[scope.$index].status==5">已了结</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="over(scope.row)">了结</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="款到发货" name="2">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%">
            <el-table-column label="序号" type="index" ></el-table-column>

            <el-table-column label="采购单编号" >
              <template slot-scope="scope">
                <span>{{scope.row.poId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" >
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="供应商名称">
              <template slot-scope="scope">
                <span>{{scope.row.venderName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建用户">
              <template slot-scope="scope">
                <span>{{scope.row.account}}</span>
              </template>
            </el-table-column>

            <el-table-column label="附加费用">
              <template slot-scope="scope">
                <span>{{scope.row.tipFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="采购产品总价">
              <template slot-scope="scope">
                <span>{{scope.row.productTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="采购单总价格">
              <template slot-scope="scope">
                <span>{{scope.row.poTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="付款方式" >
              <template slot-scope="scope">
                <span v-if="show[scope.$index].payType==1">货到付款</span>
                <span v-else-if="show[scope.$index].payType==2">款到发货</span>
                <span v-else-if="show[scope.$index].payType==3">预付款到发货</span>
              </template>
            </el-table-column>

            <el-table-column label="最低预付款金额" >
              <template slot-scope="scope">
                <span>{{scope.row.prePayFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="处理状态" prop="status" >
              <template slot-scope="scope">
                <span v-if="show[scope.$index].status==1">新增</span>
                <span v-else-if="show[scope.$index].status==2">已收货</span>
                <span v-else-if="show[scope.$index].status==3">已付款</span>
                <span v-else-if="show[scope.$index].status==4">已了结</span>
                <span v-else-if="show[scope.$index].status==5">已了结</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="over(scope.row)">了结</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="预付款到发货" name="3">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%">
            <el-table-column label="序号" type="index"  ></el-table-column>

            <el-table-column label="采购单编号"  >
              <template slot-scope="scope">
                <span>{{scope.row.poId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" >
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="供应商名称">
              <template slot-scope="scope">
                <span>{{scope.row.venderName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建用户"  >
              <template slot-scope="scope">
                <span>{{scope.row.account}}</span>
              </template>
            </el-table-column>

            <el-table-column label="附加费用"  >
              <template slot-scope="scope">
                <span>{{scope.row.tipFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="采购产品总价"  >
              <template slot-scope="scope">
                <span>{{scope.row.productTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="采购单总价格"  >
              <template slot-scope="scope">
                <span>{{scope.row.poTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="付款方式"  >
              <template slot-scope="scope">
                <span v-if="show[scope.$index].payType==1">货到付款</span>
                <span v-else-if="show[scope.$index].payType==2">款到发货</span>
                <span v-else-if="show[scope.$index].payType==3">预付款到发货</span>
              </template>
            </el-table-column>

            <el-table-column label="最低预付款金额"  >
              <template slot-scope="scope">
                <span>{{scope.row.prePayFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="处理状态" prop="status"  >
              <template slot-scope="scope">
                <span v-if="show[scope.$index].status==1">新增</span>
                <span v-else-if="show[scope.$index].status==2">已收货</span>
                <span v-else-if="show[scope.$index].status==3">已付款</span>
                <span v-else-if="show[scope.$index].status==4">已了结</span>
                <span v-else-if="show[scope.$index].status==5">已了结</span>
              </template>
            </el-table-column>

            <el-table-column label="操作"  >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="over(scope.row)">了结</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pagination"></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  name: "Orders_Settle",
  data() {
    return {
      page: 1,
      show: [],
      activeName: "1",
      user: {},
      paytype: ""
    };
  },
  created() {
    axios({
      url: "/api/main/purchase/pomain/show",
      method: "get",
      params: {
        // status: 3,
        payType: this.paytype,
        type: 4
      }
    })
      .then(res => {
        this.show = res.data.list;
        console.log(this.show);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    pagination(page) {
      //分页
      axios({
        url: "/api/main/system/user/show",
        method: "get",
        params: {
          page
        }
      })
        .then(res => {
          this.show = res.data.list;
          console.log(this.show);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    over(row) {
      //了结
      // console.log(row)
      this.$confirm("该操作将会将订单了结, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post(
              "/api/main/purchase/pomain/end",
              qs.stringify({
                poId: row.poId,
                // type: 2,
                payType: row.payType,
                page: 1
              })
            )
            .then(resp => {
              let res = resp.data;
              if (res.code == 2) {
                this.$message({
                  type: "success",
                  message: "了结成功!"
                });
                this.show = resp.data.list;
                console.log(this.show);
              } else {
                this.$message({
                  type: "info",
                  message: "了结失败!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消入库"
          });
        });
    },
    handleClick(tab) {
      //标签页点击事件
      this.paytype = tab.name;
      console.log(this.paytype);

      axios({
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: {
          // status: 3,
          payType: this.paytype,
          type: 4
        }
      })
        .then(res => {
          this.show = res.data.list;
          console.log(this.show);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.Breadcrumb {
  height: 40px;
  background: #f0f9fd;
  font-size: 13px;
  font-weight: 500;
  border-bottom: 1px #ccc solid;
}
.Breadcrumb_row {
  line-height: 40px;
}
.el-breadcrumb {
  line-height: 40px;
  font-size: 13px;
  font-weight: 500;
}
.el-pagination {
  text-align: right;
  margin-right: 100px;
}
</style>