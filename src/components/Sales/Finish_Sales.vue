<template><!-- 销售单了结 -->
  <div>
        <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Category' }">销售管理管理</el-breadcrumb-item>
            <el-breadcrumb-item>销售单了结</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>


    <div style="margin:10px;">
    <el-tabs type="border-card" @tab-click="getType" v-model="activeName">
      <el-tab-pane label="货到付款" name="1">
        <el-table bsale :data="sale">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{scope.row.soId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="customerName">
            <template slot-scope="scope">
              <span>{{scope.row.customerName}}</span>
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
              <span>{{scope.row.soTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType|text}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低预付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="collect(scope.row)">了结</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <payType /> -->
      </el-tab-pane>
      <el-tab-pane label="款到发货" name="2">
        <el-table bsale :data="sale">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{scope.row.soId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="customerName">
            <template slot-scope="scope">
              <span>{{scope.row.customerName}}</span>
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
              <span>{{scope.row.soTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType|text}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低预付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="small" size="small" @click="collect(scope.row)">了结</el-button>
              <el-button type="small" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="预付款到发货" name="3">
        <el-table bsale :data="sale">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="采购单编号">
            <template slot-scope="scope">
              <span>{{scope.row.soId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户名称" prop="customerName">
            <template slot-scope="scope">
              <span>{{scope.row.customerName}}</span>
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
              <span>{{scope.row.soTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="付款方式">
            <template slot-scope="scope">
              <span>{{scope.row.payType|text}}</span>
            </template>
          </el-table-column>
          <el-table-column label="最低预付款金额">
            <template slot-scope="scope">
              <span>{{scope.row.prePayFee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态">
            <template slot-scope="scope">
              <span>{{scope.row.status | status}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="collect(scope.row)">了结</el-button>
              <el-button type="text" size="small" @click="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


    <!-- 查看 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-table border :data="detail">
        <el-table-column label="产品编号">
          <template slot-scope="scope">
            <span>{{scope.row.productCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品数量">
          <template slot-scope="scope">
            <span>{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量单位">
          <template slot-scope="scope">
            <span>{{scope.row.unitName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售单价">
          <template slot-scope="scope">
            <span>{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售明细总价">
          <template slot-scope="scope">
            <span>{{scope.row.itemPrice}}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click=" dialogVisible= false">取 消</el-button>
      </span>
    </el-dialog>
    </div>
     <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pagination"></el-pagination>
  </div>

</template>

<script>
import axios from "axios";
const qs = require("querystring");

export default {
  data() {
    return {
      sale: [],
      page: 1,
      payType: "1",
      activeName: "1",
      status: "3",
      Total: 0,
      dialogVisible: false,
      detail: []
    };
  },
  created() {
    axios({
      url: "/api/main/sell/somain/show",
      method: "get",
      params: {
        payType: 1,
        type: 4
      }
    })
      .then(res => {
        this.sale = res.data.list;
        console.log(this.sale);
        this.Total = res.data.total;
      })
      .catch(err => {
        console.log(err);
      });
  },
  filters: {
    text(value) {
      if (value == 1) {
        return (value = "货到付款");
      }
      if (value == 2) {
        return (value = "款到发货");
      }
      if (value == 3) {
        return (value = "预付款到发货");
      }
    },
    status(value) {
      if (value == 1) {
        return (value = "新增");
      }
      if (value == 2) {
        return (value = "已收货");
      }
      if (value == 3) {
        return (value = "已付款");
      }
      if (value == 4) {
        return (value = "已了结");
      }
      if (value == 5) {
        return (value = "已预付");
      }
    }
  },
  methods: {
    //筛选
    getType(tab) {
      this.payType = tab.name;
      if (this.payType == 1) {
        this.status = 2;
      }
      if (this.payType == 2) {
        this.status = 1;
      }
      if (this.payType == 3) {
        this.status = 3;
      }
      axios({
        url: "/api/main/sell/somain/show",
        method: "get",
        params: {
          payType: this.payType,
          page: this.page,
          type: 4
        }
      })
        .then(res => {
          this.sale = res.data.list;
          console.log(this.sale);
          this.Total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    pagination(page) {//分页
      axios({
        url: "/api/main/sell/somain/show",
        method: "get",
        params: {
           payType: this.payType,
          type: 4
        }
      })
        .then(res => {
          this.sale = res.data.list;
          console.log(this.show);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //了结
    collect(row) {
      console.log(row);
      const c = confirm("是否了结");
      if (c) {
        axios({
          url: "/api/main/finance/receipt",
          method: "post",
          data: qs.stringify({
            soId: row.soId,
            payType: row.payType
          })
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        this.$message({
          type: "success",
          message: "了结成功"
        });
        location.reload();
      }
    },

    //查看
    look(row) {
      this.dialogVisible = true;
      axios({
        url: "/api/main/sell/somain/queryItem",
        method: "get",
        params: {
          soId: row.soId
        }
      })
        .then(res => {
          this.detail = res.data;
          console.log(this.detail, "明细");
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