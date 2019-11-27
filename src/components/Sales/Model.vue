<template>
  <!--产品管理  -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Category' }">产品管理</el-breadcrumb-item>
            <el-breadcrumb-item>产品列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!--添加用户-->
    <div style="margin:10px;">
      <el-button type="info" icon="el-icon-circle-plus" plain>
        <router-link to="/Modeladd">添加</router-link>
      </el-button>
    </div>

<el-row :gutter="20">
<el-col :span="5">
  <el-input v-model="Type.productCode" @input="search" style="width:200px;" placeholder="产品编号"></el-input>
</el-col>
<el-col :span="5">
  <el-input v-model="Type.name" @input="search" style="width:200px;" placeholder="产品名称"></el-input>
</el-col>
<el-col :span="5">
  <el-select v-model="Type.categoryId" placeholder="所属分类" >
            <el-option
              v-for="(item,index) in Type"
              :key="index"
              :label="item.name"
              :value="item.categoryId"
            ></el-option>
          </el-select>
</el-col>
<el-col :span="7">
   <el-button type="primary" @click="search" size="small">查询</el-button>
</el-col>
</el-row>
    <el-table :data="show" >
      <el-table-column label="序号" type="index" ></el-table-column>
      <el-table-column prop="productCode" label="产品编号" ></el-table-column>
      <el-table-column prop="name" label="产品名称" ></el-table-column>
      <el-table-column prop="unitName" label="数量单位" ></el-table-column>
      <el-table-column prop="categoryName" label="分类名称" >
        <template slot-scope="scope">
          <span v-show="scope.row.categoryId==1">水果</span>
          <span v-show="scope.row.categoryId==2">服装</span>
          <span v-show="scope.row.categoryId==3">箱包</span>
          <span v-show="scope.row.categoryId==4">护肤</span>
          <span v-show="scope.row.categoryId==5">母婴</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="添加日期" ></el-table-column>
      <el-table-column prop="price" label="销售价" ></el-table-column>
      <el-table-column prop="remark" label="产品描述" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--对话框-->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="user" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="user.productCode"></el-input>
        </el-form-item>

        <el-form-item label="产品名称" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>

        <el-form-item label="产品分类" prop="categoryId">
          <el-input v-model="user.categoryId"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="数量单位" prop="unitName">
          <el-input v-model="user.unitName"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input v-model="user.createDate"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="user.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
const qs = require("querystring");
export default {
  name: "Model",
  data() {
    return {
      dialogFormVisible: false,
      show: [],
      user: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        createDate: "",
        remark: ""
      },
      Type:{
         productCode:'',
         categoryId:'',
         name:''
      }
    };
  },
  created() {
    //获得服务器数据
    axios({
      url: "/api/main/sell/product/show",
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
       axios({
      url: "/api/main/sell/category/show",
      method: "get"
    })
      .then(res => {
        this.Type = res.data.list;
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
      this.user.productCode = row.productCode;
      this.user.name = row.name;
      this.user.unitName = row.unitName;
      this.user.categoryId = row.categoryId;
      this.user.price = row.price;
      this.user.createDate = row.createDate;
      this.user.remark = row.remark;
    },
    handleDelete(row) {
      //删除
      axios({
        url: "/api/main/sell/product/delete",
        method: "post",
        data: qs.stringify({
          productCode: row.productCode
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
      //修改里的确定
      axios({
        url: "/api/main/sell/product/update",
        method: "post",
        data: qs.stringify({
          productCode: this.user.productCode,
          name: this.user.name,
          unitName: this.user.unitName,
          categoryId: this.user.categoryId,
          price: this.user.price,
          createDate: this.user.createDate,
          remark: this.user.remark
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
        url: "/api/main/sell/product/show",
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
    search(){
      //过滤
      axios({
        url: "/api/main/sell/product/show",
        method: "get",
        params: {
          productCode: this.Type.productCode,
          name: this.Type.name,
          categoryId: this.Type.categoryId,
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