<template>
  <!-- 供应商管理  -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Supplier' }">供应商管理</el-breadcrumb-item>
            <el-breadcrumb-item>供应商列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!--添加用户-->
    <div style="margin:10px;" class="Add">
      <el-button type="info" icon="el-icon-circle-plus" plain>
        <router-link to="/SupplierAdd">添加</router-link>
      </el-button>
    </div>

    <!-- 供应商列表 -->
    <el-table :data="show" style="width: 100%">
      <el-table-column label="序号" type="index" width="100"></el-table-column>

      <el-table-column prop="venderCode" label="供应商编号" width="120"></el-table-column>

      <el-table-column prop="name" label="供应商名称" width="150"></el-table-column>

      <el-table-column prop="contactor" label="联系人" width="100"></el-table-column>

      <el-table-column prop="address" label="地址" width="100"></el-table-column>

      <el-table-column prop="postCode" label="邮政编码" width="150"></el-table-column>

      <el-table-column prop="createDate" label="注册日期" width="200"></el-table-column>

      <el-table-column prop="tel" label="电话" width="150"></el-table-column>

      <el-table-column prop="fax" label="传真" width="120"></el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="user" ref="Form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="供应商编号" prop="venderCode">
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
                <el-input v-model="user.createDate"></el-input>
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
  name: "Supplier",
  data() {
    return {
      show: [],
      page: 1,
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
      },
      dialogFormVisible: false //弹出的对话框
    };
  },
  created() {
    //获得服务器数据 供应商列表
    axios({
      url: "/api/main/purchase/vender/show ",
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
    pagination(page) { //分页
      axios({
        url: "/api/main/purchase/vender/show",
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

    handleEdit(row) {
      //修改按钮
      this.dialogFormVisible = true;
      this.user.venderCode = row.venderCode;
      this.user.passWord = row.passWord;
      this.user.name = row.name;
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
        url: "/api/main/purchase/vender/delete ",
        method: "post",
        data: qs.stringify({
          venderCode: row.venderCode
        })
      })
        .then(resp => {
          console.log(resp.data);
          alert("删除成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirm() {
      //修改里确定
      axios({
        url: "/api/main/purchase/vender/update ",
        method: "post",
        data: qs.stringify({
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
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = false;
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