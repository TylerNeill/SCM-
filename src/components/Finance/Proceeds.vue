<template>
  <!-- 收款登记 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Neworders' }">收支</el-breadcrumb-item>
            <el-breadcrumb-item>收款登记</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:10px;">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="货到付款" name="1">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%">
            <el-table-column label="序号" type="index" width="200"></el-table-column>
            <el-table-column label="销售单编号" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.soId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="客户名称" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.customerName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建用户" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.account}}</span>
              </template>
            </el-table-column>

            <el-table-column label="附加费用" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.tipFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="产品总价" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.productTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="销售单总价格" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.soTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="付款方式" width="200">
              <template slot-scope="scope">
                <span v-if="show[scope.$index].payType==1">货到付款</span>
                <span v-else-if="show[scope.$index].payType==2">款到发货</span>
                <span v-else-if="show[scope.$index].payType==3">预付款到发货</span>
              </template>
            </el-table-column>

            <el-table-column label="最低预付款金额" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.prePayFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="处理状态" prop="status" width="200">
              <template slot-scope="scope">
                <span v-if="show[scope.$index].status==1">新增</span>
                <span v-else-if="show[scope.$index].status==2">已收货</span>
                <span v-else-if="show[scope.$index].status==3">已付款</span>
                <span v-else-if="show[scope.$index].status==4">已了结</span>
                <span v-else-if="show[scope.$index].status==5">已了结</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="detail(scope.row)">明细</el-button>
                <el-button type="primary" size="mini" @click="over(scope.row)">收款</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="款到发货" name="2">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%">
            <el-table-column label="序号" type="index" width="200"></el-table-column>

            <el-table-column label="销售单编号" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.soId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="客户名称" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.customerName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建用户" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.account}}</span>
              </template>
            </el-table-column>

            <el-table-column label="附加费用" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.tipFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="产品总价" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.productTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="销售单总价格" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.soTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="付款方式" width="200">
              <template slot-scope="scope">
                <span v-if="show[scope.$index].payType==1">货到付款</span>
                <span v-else-if="show[scope.$index].payType==2">款到发货</span>
                <span v-else-if="show[scope.$index].payType==3">预付款到发货</span>
              </template>
            </el-table-column>

            <el-table-column label="最低预付款金额" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.prePayFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="处理状态" prop="status" width="200">
              <template slot-scope="scope">
                <span v-if="show[scope.$index].status==1">新增</span>
                <span v-else-if="show[scope.$index].status==2">已收货</span>
                <span v-else-if="show[scope.$index].status==3">已付款</span>
                <span v-else-if="show[scope.$index].status==4">已了结</span>
                <span v-else-if="show[scope.$index].status==5">已了结</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="detail(scope.row)">明细</el-button>
                <el-button type="primary" size="mini" @click="over(scope.row)">收款</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="预付款到发货" name="3">
          <!-- 采购单了结列表 -->
          <el-table :data="show" style="width: 100%">
            <el-table-column label="序号" type="index" width="200"></el-table-column>

            <el-table-column label="销售单编号" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.soId}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>

            <el-table-column label="客户名称" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.customerName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建用户" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.account}}</span>
              </template>
            </el-table-column>

            <el-table-column label="附加费用" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.tipFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="产品总价" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.productTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="销售单总价格" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.soTotal}}</span>
              </template>
            </el-table-column>

            <el-table-column label="付款方式" width="200">
              <template slot-scope="scope">
                <span v-if="show[scope.$index].payType==1">货到付款</span>
                <span v-else-if="show[scope.$index].payType==2">款到发货</span>
                <span v-else-if="show[scope.$index].payType==3">预付款到发货</span>
              </template>
            </el-table-column>

            <el-table-column label="最低预付款金额" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.prePayFee}}</span>
              </template>
            </el-table-column>

            <el-table-column label="处理状态" prop="status" width="200">
              <template slot-scope="scope">
                <span v-if="show[scope.$index].status==1">新增</span>
                <span v-else-if="show[scope.$index].status==2">已收货</span>
                <span v-else-if="show[scope.$index].status==3">已付款</span>
                <span v-else-if="show[scope.$index].status==4">已了结</span>
                <span v-else-if="show[scope.$index].status==5">已了结</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="detail(scope.row)">明细</el-button>
                <el-button type="primary" size="mini" @click="over(scope.row)">收款</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 弹出框内容 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-table :data="showTwo" style="width: 100%">
        <el-table-column prop="soId" label="销售单编号"></el-table-column>
        <el-table-column prop="productCode" label="产品编号"></el-table-column>
        <el-table-column prop="unitName" label="产品数量单位"></el-table-column>
        <el-table-column prop="num" label="产品数量"></el-table-column>
        <el-table-column prop="unitPrice" label="销售单价"></el-table-column>
        <el-table-column prop="itemPrice" label="产品明细总价"></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisibleTwo">
      <el-table :data="showThree" style="width: 100%">
        <el-table-column prop="soId" label="销售单单号"></el-table-column>
        <el-table-column prop="productCode" label="产品编号"></el-table-column>
        <el-table-column prop="unitName" label="收入款金额"></el-table-column>
        <el-table-column prop="unitName" label="付款方式"></el-table-column>
        <el-table-column prop="unitName" label="付款总价"></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="dialogFormVisibleTwo = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- //两个弹出框结束 -->

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
      dialogFormVisible: false,
      dialogFormVisibleTwo: false,
      page: 1,
      show: [],
      showThree: [],
      showTwo: [],
      activeName: "1",
      user: {},
      paytype: "",
      soId: "",
      row:[]
    };
  },
  created() {
    axios({
      url: "/api/main/sell/somain/show",
      method: "get",
      params: {
        // status: 3,
        payType: 1,
        type: 3
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
        url: "/api/main/sell/somain/show",
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
    confirm(row) {
      this.$confirm("该操作将会将订单收款, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post(
              "/api/main/finance/receipt",
              qs.stringify({
                soId:this.row,
                type: 1,
                payType: row.payType,
                page: 1
              })
            )
            .then(resp => {
              let res = resp.data;
              if (res.code == 2) {
                this.$message({
                  type: "success",
                  message: "收款成功!"
                });
                this.show = resp.data.list;
                console.log(resp.data);
              } else {
                this.$message({
                  type: "info",
                  message: "收款失败!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消收款"
          });
        });
    },
    handleClick(tab) {
      //标签页点击事件
      this.paytype = tab.name;
      console.log(this.paytype);

      axios({
        url: "/api/main/sell/somain/show",
        method: "get",
        params: {
          // status: 3,
          payType: this.paytype,
          type: 3
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
    detail(r) {
      //明细按钮
      axios({
        url: "api/main/sell/somain/queryItem",
        method: "get",
        params: {
          soId: r.soId
        }
      })
        .then(resp => {
          this.showTwo = resp.data;
          console.log(resp.data);
          this.user = resp.data[0];
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = true;
    },
    over(r) {
      // 收款按钮
      this.dialogFormVisibleTwo = true;
      this.row=r.soId
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