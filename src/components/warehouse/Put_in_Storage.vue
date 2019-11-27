<template>
  <!--入库登记  -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Put_in_Storage' }">仓库管理</el-breadcrumb-item>
            <el-breadcrumb-item>入库登记</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:10px;">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="货到付款" name="1">
          <!-- 采购单入库列表 -->
          <el-table :data="show" style="width: 100%" @cell-dblclick="detail">
            <el-table-column label="序号" type="index"  ></el-table-column>
            <el-table-column label="采购单编号"  >
              <template slot-scope="scope">
                <span>{{scope.row.poId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间"  >
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="供应商名称"  >
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
                <span v-else-if="show[scope.$index].status==5">已预付</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="200" >
              <template slot-scope="scope">
                <!-- 明细弹窗框 -->
                <el-popover placement="right" width="500" trigger="click">
                  <el-form :model="user" ref="form">
                    <el-form-item label="产品编号">
                      <el-input v-model="user.productCode" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称">
                      <el-input v-model="user.productName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量单位">
                      <el-input v-model="user.unitName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量">
                      <el-input v-model="user.num" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="采购单价">
                      <el-input v-model="user.unitPrice" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品明细总价">
                      <el-input v-model="user.itemPrice" readonly></el-input>
                    </el-form-item>
                  </el-form>
                  <el-button slot="reference" @click="handleEdit(scope.row)" size="mini">明细</el-button>
                </el-popover>
                <!-- 明细弹窗框结束 -->
                <el-button type="primary" size="mini" @click="over(scope.row)">入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="款到发货" name="2">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%" @cell-dblclick="detail">
            <el-table-column label="序号" type="index"  ></el-table-column>

            <el-table-column label="采购单编号"  >
              <template slot-scope="scope">
                <span>{{scope.row.poId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间"  >
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="供应商名称"  >
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

            <el-table-column label="操作" width="200"  >
              <template slot-scope="scope">
                <!-- 明细弹窗框 -->
                <el-popover placement="right" width="500" trigger="click">
                  <el-form :model="user" ref="form">
                    <el-form-item label="产品编号">
                      <el-input v-model="user.productCode" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称">
                      <el-input v-model="user.productName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量单位">
                      <el-input v-model="user.unitName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量">
                      <el-input v-model="user.num" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="采购单价">
                      <el-input v-model="user.unitPrice" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品明细总价">
                      <el-input v-model="user.itemPrice" readonly></el-input>
                    </el-form-item>
                  </el-form>
                  <el-button slot="reference" @click="handleEdit(scope.row)" size="mini">明细</el-button>
                </el-popover>
                <!-- 明细弹窗框结束 -->
                <el-button type="primary" size="mini" @click="over(scope.row)">入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="预付款到发货" name="3">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%" @cell-dblclick="detail">
            <el-table-column label="序号" type="index"  ></el-table-column>

            <el-table-column label="采购单编号"  >
              <template slot-scope="scope">
                <span>{{scope.row.poId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间"  >
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="供应商名称"  >
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

            <el-table-column label="操作" width="200"  >
              <template slot-scope="scope">
                <!-- 明细弹窗框 -->
                <el-popover placement="right" width="500" trigger="click">
                  <el-form :model="user" ref="form">
                    <el-form-item label="产品编号">
                      <el-input v-model="user.productCode" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称">
                      <el-input v-model="user.productName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量单位">
                      <el-input v-model="user.unitName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量">
                      <el-input v-model="user.num" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="采购单价">
                      <el-input v-model="user.unitPrice" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="产品明细总价">
                      <el-input v-model="user.itemPrice" readonly></el-input>
                    </el-form-item>
                  </el-form>
                </el-popover>
                <el-button slot="reference" @click="handleEdit(scope.row)" size="mini">明细</el-button>
                <!-- 明细弹窗框结束 -->
                <el-button type="primary" size="mini" @click="over(scope.row)">入库</el-button>
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
      // queryParticulars:[],
      page: 1,
      show: [],
      queryItem: [],
      activeName: "1",
      user: {
        productCode: "",
        productName: "",
        unitName: "",
        num: "",
        unitPrice: "",
        userPrice: ""
      },
      paytype: "",
      poId: "",
      t:'1'
    };
  },
  created() {
    axios({
      url: "/api/main/purchase/pomain/show",
      method: "get",
      params: {
        // status: 3,
        payType:1,
        type: 2
      }
    })
      .then(res => {
        this.show = res.data.list;
        console.log(this.paytype, 1111);
        console.log(this.show);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    detail(row, column, cell, event) {
      console.log(row);
    },
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
      //入库
      // console.log(row)
      this.$confirm("该操作将会将订单入库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post(
              "/api/main/stock/instock",
              qs.stringify({
                poId: row.poId,
                type: 2,
                payType: row.payType,
                page: 1
              })
            )
            .then(resp => {
              let res = resp.data;
              if (res.code == 2) {
                this.$message({
                  type: "success",
                  message: "入库成功!"
                });
                this.show = resp.data.list;
                console.log(this.show);
              } else {
                this.$message({
                  type: "info",
                  message: "入库失败!"
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
      axios({
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: {
          // status: 3,
          payType: tab.name,
          type: 2
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
    handleEdit(r) {
      console.log(r);
      axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: r.poId
        }
      })
        .then(resp => {
          console.log(resp.data);
          this.user = resp.data[0];
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