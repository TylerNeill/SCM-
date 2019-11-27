<template>
  <!-- 库存查询 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Put_in_Storage' }">仓库管理</el-breadcrumb-item>
            <el-breadcrumb-item>库存查询</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="6">
        <el-input
          v-model="user.productCode"
          @input="search"
          style="width:200px;"
          placeholder="产品编号"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="user.name" @input="search" style="width:200px;" placeholder="产品名称"></el-input>
      </el-col>
      <el-col :span="9">
        <span>库存数量范围：</span>
        <el-input v-model="user.min" @input="search" style="width:200px;" placeholder="最小值"></el-input>
        <el-input v-model="user.max" @input="search" style="width:200px;" placeholder="最大值"></el-input>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" size="primary" @click="search">查询</el-button>
      </el-col>
    </el-row>

    <el-table :data="show" border style="width: 96%;margin:10px;">
      <el-table-column prop="productCode" label="产品编号"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="num" label="库存数量"></el-table-column>
      <el-table-column prop="poNum" label="采购在途数"></el-table-column>
      <el-table-column prop="soNum" label="预销售数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="primary" @click="detai(scope.row)">产品变更记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出框内容 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="入库记录信息" name="1">
          <el-table :data="pro" style="width: 100%">
            <el-table-column prop="stockTime" label="入库时间"></el-table-column>
            <el-table-column prop="orderCode" label="相关采购单号"></el-table-column>
            <el-table-column prop="createUser" label="入库经手人"></el-table-column>
            <el-table-column prop="stockNum" label="入库数量"></el-table-column>
            <el-table-column prop="stockType" label="入库类型"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="出库记录信息" name="2">
          <el-table :data="pro" style="width: 100%">
            <el-table-column prop="stockTime" label="出库时间"></el-table-column>
            <el-table-column prop="orderCode" label="相关销售单号"></el-table-column>
            <el-table-column prop="createUser" label="出库经手人"></el-table-column>
            <el-table-column prop="stockNum" label="出库数量"></el-table-column>
            <el-table-column label="出库类型">
              <template slot-scope="scope">
                <span v-if="pro[scope.$index].stockType==1">采购入库</span>
                <span v-if="pro[scope.$index].stockType==2">销售出库</span>
                <span v-else-if="pro[scope.$index].stockType==3">盘点入库</span>
                <span v-else-if="pro[scope.$index].stockType==4">盘点出库</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pagination"></el-pagination>
  </div>
</template>

<script>
import dayjs from "dayjs";
import cookie from "js-cookie";
import axios from "axios";
const qs = require("querystring");
export default {
  name: "Query_Storage",
  data() {
    return {
      activeName: "1",
      show: [],
      pro: [],
      user: {
        name: "",
        productCode: "",
        min: "",
        max: ""

      },
      dialogFormVisible: false,
      t: ""
    };
  },
  created() {
    axios({
      url: "/api/main/sell/product/show ",
      method: "get",
      params: {
        // payType: 1,
        // type: 2
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
      axios({
        url: "/api/main/sell/product/show",
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
    detai(r) {
      //查看变更记录按钮
      this.t = r.productCode;
      axios({
        url: "/api/main/stock/alterRecord",
        method: "get",
        params: {
          // status: 3,
          productCode: r.productCode,
          type: 1
        }
      })
        .then(res => {
          this.pro = res.data.data.list;
          console.log(this.pro);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = true;
    },

    search() {
      //模糊查询
      axios({
        url: "/api/main/stock/query",
        method: "get",
        params: {
          productCode: this.user.productCode,
          name: this.user.name,
          min: this.user.min,
          max: this.user.max,
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
    handleClick(tab, r) {
      //标签页点击事件
      console.log(tab.name);
      axios({
        url: "/api/main/stock/alterRecord",
        method: "get",
        params: {
          // status: 3,
          productCode: this.t,
          stockType: tab.name
          // payType: tab.name
        }
      })
        .then(res => {
          this.pro = res.data.data.list;
          console.log(this.pro);
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