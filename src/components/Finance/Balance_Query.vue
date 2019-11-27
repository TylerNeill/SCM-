<template>
  <!-- 收支查询 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Neworders' }">采购管理</el-breadcrumb-item>
            <el-breadcrumb-item>采购单查询</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!-- 查询导航 -->
    <div style="margin:10px;">
      <el-row :gutter="20">
        <el-col :span="4" label="设置时间">
          <el-date-picker
            v-model="user.startDate"
            type="datetime"
            placeholder="选择开始时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>

        <el-col :span="4" label="设置时间">
          <el-date-picker
            v-model="user.endDate"
            type="datetime"
            placeholder="选择截至时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>

        <el-col :span="4">
          <el-select v-model="user.type" placeholder="收支类型" @change="search">
            <el-option
              v-for="(item,index) in Type"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="user.payType" placeholder="单据付款方式" @change="search">
            <el-option
              v-for="(item,index) in statu"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="user.no" @input="search" style="width:200px;" placeholder="相关单据号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-col>
      </el-row>

      <el-row style=" margin-top: 20px;">
        <el-col :span="24">
          <el-table border :data="show">
            <el-table-column label="付款（收款）日期" prop="no"></el-table-column>
            <el-table-column label="相关单据号" prop="no"></el-table-column>
            <el-table-column label="付款（收款）金额" prop="createTime"></el-table-column>
            <el-table-column label="经手人" prop="venderName"></el-table-column>
            <el-table-column label="单据付款方式" prop="payType"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  name: "Balance_Query",
  data() {
    return {
      show: [],
      Type: [{ value: 1, label: "收入" }, { value: 2, label: "支出" }],
      statu: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      user: {
        type: "",
        startDate: "",
        endDate: "",
        payType: "",
        no: "",
        page: ""
      },
      pickerOptions: {
        // 日期时间控件设置
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    search() {
      axios({
        url: "/api/main/finance/query",
        method: "get",
        params: {
          type: this.user.type,
          startDate: this.user.startDate,
          endDate: this.user.endDate,
          payType: this.user.payType,
          no: this.user.no
        }
      })
        .then(res => {
          this.total = res.data.total;
          this.show = res.data.list;
          console.log(show)
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
</style>