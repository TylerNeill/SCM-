<template>
  <!-- 用户管理 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/User' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!--添加用户-->
    <div style="margin:10px;">
      <el-button type="info" icon="el-icon-circle-plus" plain>
        <router-link to="/Useradd">添加</router-link>
      </el-button>
    </div>

    <!-- 用户列表 -->
    <el-table :data="show" style="width: 100%">
      <el-table-column label="序号" type="index" width="200"></el-table-column>

      <el-table-column prop="account" label="用户账号" width="200"></el-table-column>

      <el-table-column prop="name" label="用户姓名" width="200"></el-table-column>

      <el-table-column prop="status" label="锁定状态" width="200"></el-table-column>

      <el-table-column prop="createDate" label="添加日期" width="200"></el-table-column>

      <el-table-column label="用户权限列表" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.models.map(item=>item.modelName).toString()}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="user" ref="Form" label-width="100px" class="demo-ruleForm">
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
                <el-input readonly v-model="user.createDate"></el-input>
              </el-form-item>
              <el-form-item label="锁定状态" prop="status">
                <el-radio-group v-model="user.status">
                  <el-radio :label="0" checked></el-radio>
                  <el-radio :label="1"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="权限" prop="model">
                <el-checkbox-group v-model="user.modelcodes">
                  <el-checkbox :label="1" name="type">采购</el-checkbox>
                  <el-checkbox :label="2" name="type">销售</el-checkbox>
                  <el-checkbox :label="3" name="type">系统</el-checkbox>
                  <el-checkbox :label="4" name="type">财务</el-checkbox>
                  <el-checkbox :label="5" name="type">仓库</el-checkbox>
                  <el-checkbox :label="6" name="type">业务</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pagination"></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  name: "User",
  data() {
    return {
      show: [],
      page: 1,
      user: {
        account: "",
        name: "",
        passWord: "",
        status: "", //状态
        modelcodes: [] //权限列表  给他一个数组放进去
      },
      dialogFormVisible: false //对话框
    };
  },
  created() {
    //获得服务器数据
    axios({
      url: "/api/main/system/user/show ",
      method: "get"
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
    handleEdit(row) {
      //修改按钮
      this.dialogFormVisible = true;
      this.user.account = row.account;
      this.user.name = row.name;
      this.user.passWord = row.passWord;
      this.user.status = row.status;
      this.user.modelcodes = row.models.reduce(
        (prev, cur) => prev.concat(cur.modelCode),
        []
      );
    },

    handleDelete(row) {
      //删除
      axios({
        url: "/api/main/system/user/delete",
        method: "post",
        data: qs.stringify({
          account: row.account
        })
      })
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    confirm() {
      //修改里确定
      axios({
        url: "/api/main/system/user/update ",
        method: "post",
        data: qs.stringify({
          account: this.user.account,
          passWord: this.user.passWord,
          name: this.user.name,
          status: this.user.status,
          modelcodes: this.user.modelcodes,
          createDate: this.user.createDate
        })
      })
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    },

    pagination(page) {
      //分页
      axios({
        url: "/api/main/system/user/show",
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