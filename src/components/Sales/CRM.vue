<template>
  <!-- 客户管理 -->
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
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!--添加用户-->
    <div style="margin:10px;">
      <el-button type="info" icon="el-icon-circle-plus" plain>
        <router-link to="/CRMadd">添加</router-link>
      </el-button>
    </div>

    <el-row>
      <el-col :span="4">
        <el-input
          v-model="Type.customerCode"
          @input="search"
          style="width:200px;"
          placeholder="客户编号"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="Type.name" @input="search" style="width:200px;" placeholder="客户名称"></el-input>
      </el-col>
    </el-row>

    <el-table :data="show" style="width: 100%">
      <el-table-column prop="customerCode" label="客户编号"></el-table-column>
      <el-table-column prop="name" label="客户名称"></el-table-column>
      <el-table-column prop="contactor" label="联系人"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="postCode" label="邮政编码"></el-table-column>
      <el-table-column prop="createDate" label="注册日期"></el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="fax" label="传真"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 
          对话框-->
          <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="user" ref="Form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="客户编号" prop="customerCode">
                <el-input v-model="user.customerCode"></el-input>
              </el-form-item>

              <el-form-item label="客户名称" prop="name">
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="客户密码" prop="passWord">
                <el-input v-model="user.passWord"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="contactor">
                <el-input v-model="user.contactor"></el-input>
              </el-form-item>

              <el-form-item label="地址" prop="address">
                <el-input v-model="user.address"></el-input>
              </el-form-item>

              <el-form-item label="邮政编码" prop="postCode">
                <el-input v-model="user.postCode"></el-input>
              </el-form-item>

              <el-form-item label="注册日期" prop="createDate">
                <el-input v-model="user.createDate"></el-input>
              </el-form-item>

              <el-form-item label="电话" prop="tel">
                <el-input v-model="user.tel"></el-input>
              </el-form-item>
              <el-form-item label="传真" prop="fax">
                <el-input v-model="user.fax"></el-input>
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
  name: "CRM",
  data() {
    return {
      dialogFormVisible: false,
      show: [],
      user: {
        customerCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: "",
        tel: "",
        fax: ""
      },
      Type: {
        name: "",
        customerCode: ""
      }
    };
  },
  created() {
    //获得服务器数据
    axios({
      url: "/api/main/sell/customer/show",
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
      //修改
      this.dialogFormVisible = true;
      this.user.customerCode = row.customerCode;
      this.user.name = row.name;
      this.user.passWord = row.passWord;
      this.user.contactor = row.contactor;
      this.user.address = row.address;
      this.user.postCode = row.postCode;
      this.user.createDate = row.createDate;
      this.user.tel = row.tel;
      this.user.fax = row.fax;
    },
    handleDelete(row) {
      //删除
      axios({
        url: "/api/main/sell/customerr/delete",
        method: "post",
        data: qs.stringify({
          customerCode: row.customerCode
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
      // 对话框里的确定
      axios({
        url: "/api/main/sell/customer/update",
        method: "post",
        data: qs.stringify({
          customerCode: this.user.customerCode,
          name: this.user.name,
          passWord: this.user.passWord,
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
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    },
    pagination(page) {
      axios({
        url: "/api/main/sell/customer/show",
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
    search() {
      //过滤
      axios({
        url: "/api/main/sell/customer/show",
        method: "get",
        params: {
          customerCode: this.Type.customerCode,
          name: this.Type.name
        }
      })
        .then(res => {
          this.total = res.data.total;
          this.show = res.data.list;
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
