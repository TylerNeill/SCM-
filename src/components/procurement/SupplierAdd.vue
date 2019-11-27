<template>
  <!-- 供应商添加 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Supplier' }">供应商管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加新供应商</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:20px;">
      <h3 style="border-bottom:1px #ccc solid;padding-bottom:10px;">
        <span style="border-bottom:3px #66C9F3 solid;padding-bottom:10px;">基本信息</span>
      </h3>
    </div>

    <div class="content">
      <el-form :model="user" ref="regForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="供应商编号" prop="account">
          <el-input v-model="user.venderCode"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="passWord">
          <el-input v-model="user.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="user.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期">
          <el-input v-model="user.createDate">{{user.createDate}}</el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="user.fax"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.passWord"></el-input>
        </el-form-item>
        <el-button type="danger">取 消</el-button>
        <el-button type="primary" @click="preserve">确 定</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import cookie from "js-cookie";
import axios from "axios";
const qs = require("querystring");
export default {
  name: "SupplierAdd",
  data() {
    return {
      user: {
        venderCode: "",
        name: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: "",
        tel: "",
        fax: "",
        passWord: ""
      },
      rules: {
        venderCode: [
          { required: true, message: "请输入供应商编号" },
          {
            pattern: /^[\da-zA-Z]{4,20}$/,
            message: "4-20位数字字母",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
          {
            pattern: /^.{1,100}$/,
            message: "长度不超过100",
            trigger: "blur"
          }
        ],
        contactor: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          {
            pattern: /^\S+$/,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        createDate: [
          { required: true, message: "请输入日期", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    preserve() {
      console.log(this.$refs);
      // 对整个表单进行校验
      this.$refs.regForm.validate(valid => {
        console.log(valid);
        if (valid) {
          if (this.user.passWord == "") {
            this.user.passWord = this.user.venderCode;
          }
          console.log(this.user, 1111);
          axios({
            url: "api/main/purchase/vender/add",
            method: "post",
            data: qs.stringify({
              //转成字符串
              venderCode: this.user.venderCode,
              passWord: this.user.passWord,
              name: this.user.name,
              contactor: this.user.contactor,
              address: this.user.address,
              postCode: this.user.postCode,
              createDate: this.user.createDate,
              tel: this.user.tel,
              fax: this.user.fax
            })
          })
            .then(resp => {
              console.log(resp.data);
              alert("添加成功");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.user.createDate = dayjs().format("YYYY-MM-DD");
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
.content .el-input {
  width: 500px;
}
</style>