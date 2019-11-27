<template>
  <!-- 库存盘点 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Put_in_Storage' }">仓库管理</el-breadcrumb-item>
            <el-breadcrumb-item>库存盘点</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!-- 库存盘点列表 -->
    <el-table :data="show" border style="width: 96%;margin:10px;">
      <!-- <el-table-column type="index" width="50" label="序号"></el-table-column> -->
      <el-table-column prop="productCode" label="产品编号"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="num" label="当前库存"></el-table-column>
      <el-table-column prop="poNum" label="采购在途数"></el-table-column>
      <el-table-column prop="soNum" label="预销售数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="primary" @click="detai(scope.row)">库存更新</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="采购单详细信息" :visible.sync="dialogVisible" width="60%">
      <h3>基础信息</h3>
      <el-form :model="user" :rules="rules" ref="Form" label-width="110px" >
        <el-form-item label="变化数量" prop="num">
          <el-input v-model="user.num"></el-input>
        </el-form-item>
        <el-form-item label="变化类型" prop="type">
          <el-select v-model="user.type">
            <el-option label="损耗" value="1"></el-option>
            <el-option label="盘余" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变化原因" prop="description">
          <el-input v-model="user.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sub()">确定保存</el-button>
          <el-button @click="this.dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pagination"></el-pagination>
  </div>
</template>

<script>
import dayjs from "dayjs";
import cookie from "js-cookie";
import axios from "axios";
const qs = require("querystring");
export default {
  name: "Take_Stock",
  data() {
    return {
      dialogVisible: false,
      show: [],
      user: {
        num: "",
        type: "",
        description: "",
        originNum: "",
        productCode: ""
      },
      rules: {
         num: [
          {
            required: true,
            message: "请输入变化数量",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入变化类型",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "请输入变化原因",
            trigger: "blur"
          }
        ],
      },
     
    };
  },
  created() {
    axios({
      url: "/api/main/sell/product/show ",
      method: "get",
      params: {
        // payType: 1,
        // type: 2
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
  methods: {
    pagination(page) {//分页
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
    sub() {
      this.dialogVisible = false;
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

      axios({
        url: "api/main/stock/checkstock",
        method: "get",
        params: {
          num: this.user.num,
          originNum: this.user.originNum,
          productCode: this.user.productCode,
          type: this.user.type,
          description: this.user.description
        }
      })
        .then(resp => {
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    detai(r) {
      this.dialogVisible = true;
      this.user.productCode = r.productCode;
      this.user.originNum = r.num;
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