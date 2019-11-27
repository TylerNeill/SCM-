<template>
  <!-- 客户添加-->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Category' }">销售管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户添加</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:10px;">
      <h3 style="border-bottom:1px #ccc solid;padding-bottom:10px;">
        <span style="border-bottom:3px #66C9F3 solid;padding-bottom:10px;">基本信息</span>
      </h3>
    </div>

    <!-- 表格 -->
    <div style="width:500px;margin:25px;">
      <el-form :model="user" :rules="rules" ref="Form" label-width="110px" class="demo-ruleForm">
        <el-form-item label="客户编号" prop="customerCode">
          <el-input v-model="user.customerCode"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="user.passWord"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="user.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="user.postCode"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input readonly v-model="user.item"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="user.fax"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定保存</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  name: "CRMadd",
  data() {
    return {
      user: {
         customerCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode:"",
        createDate: "",
        tel: "",
        fax:"",
        item:""
      },
       rules: {
        customerCode: [
          {
            type: "string",
            required: true,
            message: "请输入客户编号",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名" }],
        passWord: [
          {
            type: "string",
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        contactor: [
          {
            type: "string",
            required: true,
            message: "请输入联系人",
            trigger: "blur"
          }
        ],
         tel: [{ required: true, message: "请输入电话" }],
      }
    };
  },
  methods:{
    submitForm() {
      this.$refs["Form"].validate(valid => {
        // valid: true-数据合法，false - 数据不合法
        console.log("表单验证的结果：", valid);
        if (valid) {
          alert("数据合法，可以提交");
        } else {
          alert("请确保数据合法后再提交");
        }
      });
      console.log("this.user",this.user);
      this.user.createDate=this.user.item
      axios
        .post("/api/main/sell/customer/add", qs.stringify(this.user), {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          if (res.code == 2) {
            this.$router.push("/CRM");
          }
        });
    },
    resetForm() {}
  },
   created() {
    this.user.item = dayjs().format("YYYY-MM-DD");
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
