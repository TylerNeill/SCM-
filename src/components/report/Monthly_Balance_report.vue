<template>
  <!--月度收支报表 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Put_in_Storage' }">月度报表</el-breadcrumb-item>
            <el-breadcrumb-item>月度收支报表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:10px;">
      <el-form label-width="80px" :inline="true" v-model="user" class="demo-form-inline">
        <el-form-item label="年月选择">
          <el-date-picker
            v-model="user.value2"
            type="month"
            placeholder="选择月"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="show">
        <el-table-column label="收款总金额">
          <template slot-scope="scope">
            <span>{{scope.row.recePrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款总金额">
          <template slot-scope="scope">
            <span>{{scope.row.payPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="收款交易次数">
          <template slot-scope="scope">
            <span>{{scope.row.receCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款交易次数">
          <template slot-scope="scope">
            <span>{{scope.row.payCount }}</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 表格 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="销售单号" name="first">
          <el-table :data="showTwo">
            <el-table-column label="销售单号">
              <template slot-scope="scope">
                <span>{{scope.row.soid}}</span>
              </template>
            </el-table-column>
            <el-table-column label="销售单日期">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="收款日期">
              <template slot-scope="scope">
                <span>{{scope.row.pay_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="收款金额">
              <template slot-scope="scope">
                <span>{{scope.row.pay_price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="经手人">
              <template slot-scope="scope">
                <span>{{scope.row.account }}</span>
              </template>
            </el-table-column>
            <el-table-column label="处理状态">
              <template slot-scope="scope">
                <span>{{scope.row.status |status}}</span>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="Total2"
            @current-change="pagination"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="付款明细" name="second">
          <el-table :data="showThree">
            <el-table-column label="采购单号">
              <template slot-scope="scope">
                <span>{{scope.row.poid}}</span>
              </template>
            </el-table-column>
            <el-table-column label="采购日期">
              <template slot-scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="付款日期">
              <template slot-scope="scope">
                <span>{{scope.row.pay_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="付款金额">
              <template slot-scope="scope">
                <span>{{scope.row.pay_price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="经手人">
              <template slot-scope="scope">
                <span>{{scope.row.account }}</span>
              </template>
            </el-table-column>
            <el-table-column label="处理状态">
              <template slot-scope="scope">
                <span>{{scope.row.status |status}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="Total1"
            @current-change="paginationTwo"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        value2: ""
      },
      show: [],
      activeName: "first",
      showTwo: [],
      showThree: [],
      Total1: 0,
      page1: 1,
      page2: 1,
      Total2: 0
    };
  },
  methods: {
    search() {
      console.log(this.user);
      axios({
        url: "api/main/report/payment/main",
        method: "get",
        params: {
          time: this.user.value2
        }
      })
        .then(resp => {
          this.show.splice(0, 1);
          this.show.push(resp.data);
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
      axios({
        url: "api/main/report/payment/detail/receipt",
        method: "get",
        params: {
          time: this.user.value2
        }
      })
        .then(resp => {
          this.page1 = 1;
          this.Total1 = resp.data.total;
          this.showTwo = resp.data.list;
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
      axios({
        url: "api/main/report/payment/detail/pay",
        method: "get",
        params: {
          time: this.user.value2
        }
      })
        .then(resp => {
          this.page2 = 1;
          this.Total2 = resp.data.total;
          this.showThree = resp.data.list;
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(tab) {
      // console.log(tab.index)
      if (tab.index == 0) {
        axios({
          url: "api/main/report/payment/detail/receipt",
          method: "get",
          params: {
            time: this.user.value2
          }
        })
          .then(resp => {
            this.Total1 = resp.data.total;
            this.page1 = 1;
            this.showTwo = resp.data.list;
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios({
          url: "api/main/report/payment/detail/pay",
          method: "get",
          params: {
            time: this.user.value2
          }
        })
          .then(resp => {
            this.Total2 = resp.data.total;
            this.page2 = 1;
            this.showThree = resp.data.list;
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    pagination(value) {
      axios({
        url: "api/main/report/payment/detail/receipt",
        method: "get",
        params: {
          time: this.user.value2,
          page: value
        }
      })
        .then(resp => {
          this.Total1 = resp.data.total;
          this.showTwo = resp.data.list;
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    },

    paginationTwo(value) {
      axios({
        url: "api/main/report/payment/detail/pay",
        method: "get",
        params: {
          time: this.user.value2,
          page: value
        }
      })
        .then(resp => {
          this.Total2 = resp.data.total;
          this.showThree = resp.data.list;
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
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
  }
};
</script>

<style >
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