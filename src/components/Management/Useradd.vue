<template>
  <!-- 用户添加  -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/User' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加新用户</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div style="margin:20px;">
      <h3 style="border-bottom:1px #ccc solid;padding-bottom:10px;">
        <span style="border-bottom:3px #66C9F3 solid;padding-bottom:10px;">基本信息</span>
      </h3>
    </div>

    <div>
       <el-form :model="user" :rules="rules" ref="regForm" label-width="100px" >
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="user.account"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passWord">
          <el-input v-model="user.passWord"></el-input>
        </el-form-item>
        <el-form-item label="添加日期">
          <el-input readonly v-model="user.item">{{user.item}}</el-input>
        </el-form-item>
       
         <el-form-item label="锁定状态" prop="status">
          <el-radio-group v-model="user.status">
            <el-radio label="0" checked></el-radio>
            <el-radio label="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权限" prop="model">
          <el-checkbox-group v-model="user.modelCodes">
            <el-checkbox label="1">采购</el-checkbox>
            <el-checkbox label="2">销售</el-checkbox>
            <el-checkbox label="3">系统</el-checkbox>
            <el-checkbox label="4">财务</el-checkbox>
            <el-checkbox label="5">仓库</el-checkbox>
            <el-checkbox label="6">业务</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
          <el-button type="primary" @click="preserve">确定保存</el-button>
          <el-button type="danger">取消</el-button>
       </el-form>
    </div>
    
  </div>
</template>

<script>
import dayjs from "dayjs";
import cookie from "js-cookie";
import axios from 'axios'
const qs = require("querystring");
export default {
  name: "Useradd",
  data(){
    return{
      user:{
        account:"",
        name:"",
        passWord:"",
        status:"",//状态
        modelCodes:[],//权限列表  给他一个数组放进去
        item:""
      },
      rules:{
        account: [{type: "string",required: true,message: "请输入用户名",trigger: "blur"}],
        name: [{ required: true, message: "请输入姓名" }], 
        passWord: [{type: "string",required: true,message: "请输入密码",trigger:"blur"}],
        status: [{ type: "string", message: "请输入正确格式" }], //状态
        modelCodes: [{ type: "array", message: "格式不正确" }] //权限
      }
    }
  },
  methods:{
    preserve(){
     console.log(this.$refs);
      // 对整个表单进行校验
      this.$refs.regForm.validate(valid => {
        console.log(valid);
        if (valid) {
          alert("数据合法");
          console.log(this.user, 1111);
          axios({
            url: "api/main/system/user/add",
            method: "post",
            data:qs.stringify({ //转成字符串
              account: this.user.account,
              passWord: this.user.passWord,
              name: this.user.name,
              status: this.user.status,
              modelcodes: this.user.modelCodes,
              createDate: this.user.item,
            })
          })
            .then(resp => {
              console.log(resp.data);
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
      this.user.item = dayjs().format("YYYY-MM-DD");
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
.el-input{
  width: 400px;
}

</style>