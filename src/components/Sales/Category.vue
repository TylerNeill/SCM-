<template>
  <!-- 产品分类管理 -->
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
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!--添加用户-->
    <div style="margin:10px;">
      <el-button type="info" icon="el-icon-circle-plus" plain>
        <router-link to="/Categoryadd">添加</router-link>
      </el-button>
    </div>

    <el-table :data="show" style="width: 100%">
      <el-table-column prop="categoryId" label="分类序列号" width="200"></el-table-column>
      <el-table-column prop="name" label="产品类别名称" width="200"></el-table-column>
      <el-table-column prop="remark" label="描述" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 
          对话框-->
          <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="user" ref="Form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="分类序列号" prop="categoryId">
                <el-input v-model="user.categoryId"></el-input>
              </el-form-item>

              <el-form-item label="名称" prop="name">
                <el-input v-model="user.name"></el-input>
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
  name: "Category",
  data() {
    return {
      dialogFormVisible: false,
      show: [],
      user: {
        categoryId: "",
        name: "",
        remark: ""
      }
    };
  },
  created() {
    //获得服务器数据
    axios({
      url: "/api/main/sell/category/show",
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
    confirm() {
      //弹框里的确定
      axios({
        url: "/api/main/sell/category/update",
        method: "post",
        data: qs.stringify({
          categoryId: this.user.categoryId,
          name: this.user.name,
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

    handleEdit(row) {
      //修改
      this.dialogFormVisible = true;
      this.user.categoryId = row.categoryId;
      this.user.name = row.name;
      this.user.remark = row.remark;
    },

    handleDelete(row) {
      //删除
      axios({
        url: "/api/main/sell/category/delete",
        method: "post",
        data: qs.stringify({
          categoryId: row.categoryId
        })
      })
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    pagination(page) {
      //分页
      axios({
        url: "/api/main/sell/category/show",
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
