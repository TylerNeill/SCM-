<template>
  <!-- 添加产品分类 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Category' }">产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品分类列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加产品分类</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:10px;">
      <h3 style="border-bottom:1px #ccc solid;padding-bottom:10px;">
        <span style="border-bottom:3px #66C9F3 solid;padding-bottom:10px;">基本信息</span>
      </h3>
    </div>

    <div style="width:500px;margin:25px;">
      <el-form :model="user" :rules="rules" ref="Form" label-width="110px" class="demo-ruleForm">
        <el-form-item label="产品分类序号" prop="usergoryId">
          <el-input v-model="user.usergoryId"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="user.remark"></el-input>
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
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  name: "usergoryadd",
  data() {
    return {
      user: {
        usergoryId: "",
        name: "",
        remark: ""
      },
      rules: {
        account: [
          {
            type: "string",
            required: true,
            message: "请输入产品分类序号",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入姓名" }],
        remark: [
          {
            type: "string",
            required: true,
            message: "请输入描述内容",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
      console.log(this.user);
      axios
        .post("/api/main/sell/category/add", qs.stringify(this.user), {
          headers: { Authorization: cookie.get("token") }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          if (res.code == 2) {
            this.$router.push("/Category");
          }
        });
    },
    resetForm() {}
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
