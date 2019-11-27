<template>
  <!-- 新添加销售单 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/OrdersAdd' }">销售管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加销售单单</el-breadcrumb-item>
            <el-breadcrumb-item>新添加销售单</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>
    <!--添加用户-->
    <div style="margin:10px;">
      <el-button type="info" icon="el-icon-circle-plus" plain @click="add">添加明细</el-button>
      <el-button type="info" icon="el-icon-circle-plus" plain @click="save">保存</el-button>
    </div>

    <el-row>
      <el-col :span="7">
        <el-form :model="user" ref="user" label-width="80px" :rules="rules">
          <el-form-item label="销售单编号" prop="soId">
            <el-input v-model="user.soId" readonly></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="user.createTime" readonly></el-input>
          </el-form-item>
          <el-form-item label="客户选择" prop="customerCode">
            <el-select v-model="user.customerCode" placeholder="请选择" @change="sup">
              <el-option
                v-for="(item,index) in customer"
                :key="index"
                :label="item.name"
                :value="item.customerCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建用户" prop="account">
            <el-input v-model="user.account" readonly></el-input>
          </el-form-item>
          <el-form-item label="附加费用" prop="tipFee">
            <el-input v-model="user.tipFee" @change="totalPrice"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="7" :offset="5">
        <el-form :model="user" ref="user" label-width="80px" :rules="rules">
          <el-form-item label=" 采购产品总价" prop="productTotal">
            <el-input v-model="user.productTotal" readonly></el-input>
          </el-form-item>
          <el-form-item label="付款方式" prop="payType">
            <el-select v-model="user.payType" placeholder="请选择" @change="select">
              <el-option
                v-for="(item,index) in Type"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最低预付款金额" prop="prePayFee">
            <el-input v-model="user.prePayFee" :disabled="flag"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="user.remark"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table border :data="user.soitems">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="产品编号" prop="productCode">
             <template slot-scope="scope">
              <div style=" display:flex">
                <el-input v-model="scope.row.productCode"></el-input>
                <el-button
                  type="primary"
                  @click="go(scope.$index)"
                  style="width:40px;height:40px"
                  class="el-icon-edit-outline"
                ></el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="name">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量单位" prop="unitName">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.unitName" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" prop="productCode">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.num"
                placeholder="请输入内容"
                @change="totalPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="采购单价" prop="unitPrice">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.unitPrice"
                placeholder="请输入内容"
                @change="totalPrice"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="明细总价" prop="itemPrice">
            <template slot-scope="scope">
              <el-input v-model="scope.row.itemPrice" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="primary"
                @click="handleDelete(scope.$index,scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-table border :data="pro">
        <el-table-column label="选择">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="产品编号">
          <template slot-scope="scope">
            <span>{{scope.row.productCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量单位">
          <template slot-scope="scope">
            <span>{{scope.row.unitName}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      dialogVisible: false,
      flag: true,
      //明细数据
      pro: [],
      radio: "",
      pointIndex: "",
      Type: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      user: {
        soId: new Date(),
        customerCode: "",
        account: "",
        createTime: new Date(),
        tipFee: "0",
        productTotal: "",
        soTotal: "",
        payType: "",
        prePayFee: "0",
        status: "1",
        remark: "",
        soitems: []
      },
      customer: [],
      rules: {
        // soId: [{ required: true }],
        customerCode: [
          { message: "请选择供应商名称", trigger: "blur", required: true }
        ],

        tipFee: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        prePayFee: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        productTotal: [
          { message: "请在明细里完整填写", trigger: "blur", required: true },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        payType: [{ required: true }]
      }
    };
  },
  filters: {
    two(value) {
      return parseFloat(value).toFixed(2);
    }
  },
  methods: {
    //上传数据
    save() {
      // if (this.user.soitems == !"") {
      if (this.user.prePayFee < this.user.productTotal) {
        this.$refs.user.validate(valid => {
          console.log(valid);
          if (valid) {
            alert("数据合法");
            console.log(this.user);
            axios({
              url: "api/main/sell/somain/add",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: JSON.stringify(this.user)
            })
              .then(resp => {
                console.log(resp);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.$router.push("/NewAdd");
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("输入的数据不合法");
            alert("输入的数据不合法");
            // return;
          }
        });
      } else {
        alert("最低预付款必须小于产品总价");
      }
      // } else {
      //   alert("明细不能为空");
      // }
    },

    //删除行
    handleDelete(index) {
      this.user.soitems.splice(index, 1);
    },

    //创建时间
    time() {
      let year = this.user.createTime.getFullYear();
      let month = this.user.createTime.getMonth() + 1;
      let date = this.user.createTime.getDate();
      let hours = this.user.createTime.getHours();
      let minutes = this.user.createTime.getMinutes();
      let seconds = this.user.createTime.getSeconds();
      return (this.user.createTime = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date}`);
    },
    timea() {
      let y = this.user.soId.getFullYear();
      let m = this.user.soId.getMonth() + 1;
      let d = this.user.soId.getDate();
      let h = this.user.soId.getHours();
      let min = this.user.soId.getMinutes();
      let s = this.user.soId.getSeconds();
      return `${y}${m < 10 ? "0" + m : m}${d < 10 ? "0" + d : d}${
        h < 10 ? "0" + h : h
      }${min < 10 ? "0" + min : min}${s < 10 ? "0" + s : s}`;
    },

    //添加行
    add() {
      var newValue = {
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: ""
      };
      this.user.soitems.push(newValue);
    },

    //选择器传值
    //付款方式
    select(value) {
      let t = "";
      t = this.Type.find(item => {
        return (item.value = value);
      });

      this.user.payType = value;
      if (value == 3) {
        this.flag = false;
      }
    },

    //客户
    sup(value) {
      let n = "";
      n = this.customer.find(item => {
        return (item = value);
      });
      this.user.customerCode = value;
    },

    //选择明细页显示
    go(index) {
      this.dialogVisible = true;
      this.pointIndex = index;
      console.log(index);
    },

    //确认选择
    confirm() {
      this.dialogVisible = false;
      const selected = this.pro[this.radio];
      console.log(selected);
      this.user.soitems[this.pointIndex].productCode = selected.productCode;
      this.user.soitems[this.pointIndex].name = selected.name;
      this.user.soitems[this.pointIndex].unitName = selected.unitName;
    },

    //添加采购产品总价
    totalPrice() {
      this.user.soitems.map(item => {
        item.itemPrice = item.num * item.unitPrice;
      });
      this.user.productTotal = this.user.soitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);

      this.user.soTotal =
        Number(this.user.productTotal) + Number(this.user.tipFee);
    }
  },

  created() {
    this.time();
    this.user.soId = this.timea();
    this.user.account = Cookies.get("loginUser");

    axios.get(`/api/main/sell/customer/show`).then(resp => {
      this.customer = resp.data.list;
    });

    axios({
      url: "/api/main/sell/product/all ",
      method: "get"
    })
      .then(res => {
        this.pro = res.data;
      })
      .catch(err => {
        console.log(err);
      });
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