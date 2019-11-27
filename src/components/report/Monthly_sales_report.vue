<template><!-- 月度销售报表 -->
<div>
  <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Put_in_Storage' }">月度报表</el-breadcrumb-item>
            <el-breadcrumb-item>月度销售报表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>
  <div  style="margin:10px;">
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
      <el-table-column label="销售单数">
        <template slot-scope="scope">
          <span>{{scope.row.totalnum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="已了结单数">
        <template slot-scope="scope">
          <span>{{scope.row.endtotalnum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售总金额">
        <template slot-scope="scope">
          <span>{{scope.row.sototal |two}}</span>
        </template>
      </el-table-column>
      <el-table-column label="已付款金额">
        <template slot-scope="scope">
          <span>{{scope.row.totalpay |two}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 明细 -->
    <el-table :data="list">
      <el-table-column label="销售单号">
        <template slot-scope="scope">
          <span>{{scope.row.poId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户编号">
        <template slot-scope="scope">
          <span>{{scope.row.customerCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户名称">
        <template slot-scope="scope">
          <span>{{scope.row.customerName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售日期">
        <template slot-scope="scope">
          <span>{{scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经手人">
        <template slot-scope="scope">
          <span>{{scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售单总金额">
        <template slot-scope="scope">
          <span>{{scope.row.productTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column label="未付款金额">
        <template slot-scope="scope">
          <span>{{scope.row.payType }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="处理状态">
        <template slot-scope="scope">
          <span>{{scope.row.status |status}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
       <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="Total"
            @current-change="pagination"
          ></el-pagination>
  </div></div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      Total: 0,
      user: {
        value2: ""
      },
      show: [],
      list: [],
      page:1
    };
  },
  methods: {
    search() {
      console.log(this.user);
      axios({
        url: "api/main/report/somain/main",
        method: "get",
        params: {
          time: this.user.value2
        }
      })
        .then(resp => {
          this.page=1
          this.show.splice(0, 1);
          this.show.push(resp.data);
          //   console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
      axios({
        url: "api/main/report/somain/main",
        method: "get",
        params: {
          time: this.user.value2
        }
      })
        .then(resp => {
          this.Total = resp.data.details.total;
          this.list = resp.data.details.list;
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    },
    pagination(val) {
      axios({
        url: "api/main/report/somain/main",
        method: "get",
        params: {
          time: this.user.value2,
          page: val
        }
      })
        .then(resp => {
            
          this.Total = resp.data.details.total;
          this.list = resp.data.details.list;
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    two(value) {
      return parseFloat(value).toFixed(2);
    },
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