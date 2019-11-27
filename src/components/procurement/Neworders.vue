<template>
  <!-- 新添采购单 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Neworders' }">采购管理</el-breadcrumb-item>
            <el-breadcrumb-item>新添采购单</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>
    <!--添加用户-->
    <div style="margin:10px;">
      <el-button type="info" icon="el-icon-circle-plus" plain>
        <router-link to="/OrdersAdd">添加</router-link>
      </el-button>
    </div>

    <!-- 采购单列表 -->
    <el-table :data="show" style="width: 100%">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column label="采购单编号" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.poId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称">
        <template slot-scope="scope">
          <span>{{scope.row.venderName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建用户">
        <template slot-scope="scope">
          <span>{{scope.row.account}}</span>
        </template>
      </el-table-column>
      <el-table-column label="附加费用">
        <template slot-scope="scope">
          <span>{{scope.row.tipFee}}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购产品总价">
        <template slot-scope="scope">
          <span>{{scope.row.productTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="采购单总价格">
        <template slot-scope="scope">
          <span>{{scope.row.poTotal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款方式">
        <template slot-scope="scope">
          <span v-if="show[scope.$index].payType==1">货到付款</span>
          <span v-else-if="show[scope.$index].payType==2">款到发货</span>
          <span v-else-if="show[scope.$index].payType==3">预付款到发货</span>
        </template>
      </el-table-column>
      <el-table-column prop="prePayFee" label="最低预付款金额">
        <template slot-scope="scope">
          <span>{{scope.row.prePayFee}}</span>
        </template>
      </el-table-column>

      <!-- 点修改-对话框 -->
      <el-table-column prop label="操作" width="180">
        <template slot-scope="scope">
          <el-dialog title="修改" :visible.sync="dialogFormVisible" width="1200px">
            <el-form :model="user" ref="Form" label-width="100px" class="demo-ruleForm">
              <el-row>
                <el-form-item label="采购单编号" prop="poId">
                  <el-input v-model="user.poId" readonly unselectable="on"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="供应商" prop="venderCode">
                    <el-select
                      v-model="user.venderCode"
                      placeholder="请选择供应商"
                      readonly
                      unselectable="on"
                    >
                      <el-option
                        v-for="(item,index) in supplier"
                        :key="index"
                        :label="item.name"
                        :value="item.venderCode"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="供应商编号" prop="venderCode">
                    <el-input v-model="user.venderCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建用户" prop="account">
                    <el-input v-model="user.account" readonly unselectable="on"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createTime">
                    <el-input v-model="user.createTime" readonly unselectable="on"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="附加费用" prop="tipFee">
                    <el-input v-model="user.tipFee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品总价" prop="productTotal">
                    <el-input v-model="user.productTotal"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="采购总价" prop="poTotal">
                    <el-input v-model="user.poTotal"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款方式" prop="payType">
                    <el-select v-model="user.payType" placeholder="请选择付款方式">
                      <el-option label="货到付款" :value="1"></el-option>
                      <el-option label="款到发货" :value="2"></el-option>
                      <el-option label="预付款到发货" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="最低预付款金额" prop="prePayFee" label-width="120px">
                    <el-input v-model="user.prePayFee"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="采购单状态" prop="status">
                    <el-select v-model="user.status" placeholder="请选择采购单状态">
                      <el-option label="新增" :value="1"></el-option>
                      <el-option label="已收货" :value="2"></el-option>
                      <el-option label="已付款" :value="3"></el-option>
                      <el-option label="已了结" :value="4"></el-option>
                      <el-option label="已预付" :value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="user.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-button type="primary" icon="el-icon-circle-plus" @click="handleEditAdd">添加明细</el-button>

              <!-- 点添加下面出一行 -->
              <el-table :data="user.poitems" style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="productCode" label="产品编号">
                  <template slot-scope="scope">
                    <div style=" display:flex">
                      <el-input v-model="scope.row.productCode"></el-input>
                      <el-button
                        type="primary"
                        @click="proid(scope.$index)"
                        style="width:40px;height:40px"
                        class="el-icon-edit-outline"
                      ></el-button>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column prop="name" label="产品名称">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="unitName" label="数量单位">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.unitName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="num" label="产品数量">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.num"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="unitPrice" label="采购单价">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.unitPrice"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="itemPrice" label="明细总价">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.itemPrice"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                  <template slot-scope="scope">
                    <el-button type="primary" size="primary" @click="detai(scope.row)">确定</el-button>
                    <el-button type="primary" size="primary" @click="del(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" size="primary" @click="det">确定修改</el-button>
            </el-form>
          </el-dialog>
          <!-- 点修改对话框结束 -->
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 产品明细选择对话框 -->
    <el-dialog :visible.sync="dialogFormVisible1">
      <el-table :data="pro" style="width: 100%">
        <el-table-column label="选择">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="productCode" label="产品编号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="categoryId" label="数量单位"></el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000" @current-change="pagination"></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
import cookie from "js-cookie";
const qs = require("querystring");
export default {
  name: "Neworders",
  data() {
    return {
      show: [], //最外面界面
      page: 1,
      user: {
        //修改  弹出对话框数据
        poId: "",
        venderCode: "",
        account: "",
        createTime: "",
        tipFee: "",
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: "",
        status: "",
        remark: "",
        poitems: [],
        itemPrice: "",
        num: ""
      },
      supplier: [],
      radio: "",
      choose: "",
      dialogFormVisible: false, //对话框,
      dialogFormVisible1: false,
      pro: [] //产品选择对话框
    };
  },
  created() {
    //获得服务器数据
    axios({
      url: "/api/main/purchase/pomain/show",
      method: "get",
      params: {
        type: 1
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

    axios({
      url: "/api/main/purchase/vender/all",
      method: "get"
    })
      .then(res => {
        this.supplier = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios({
      url: "/api/main/sell/product/all ",
      method: "get"
    })
      .then(res => {
        this.pro = res.data;
        console.log(this.pro);
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
      this.user.poId = row.poId;
      this.user.venderCode = row.venderCode;
      this.user.account = row.account;
      this.user.createTime = row.createTime;
      this.user.tipFee = row.tipFee;
      this.user.productTotal = row.productTotal;
      this.user.poTotal = row.poTotal;
      this.user.payType = row.payType;
      this.user.prePayFee = row.prePayFee;
      this.user.status = row.status;
      this.user.remark = row.remark;
      axios({
        // 获取指定采购单明细
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          // this.user.poitems=res.data
          this.user.poitems = res.data;
          console.log(this.user.poitems, 1111);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      console.log(row);
    },
    handleDelete(row) {
      //删除
      axios({
        url: "/api//main/purchase/pomain/delete",
        method: "post",

        data: qs.stringify({
          poId: row.poId
        })
      })
        .then(resp => {
          if (resp.data.code === 2) {
            alert("删除成功");
          }
          console.log(resp.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirm() {
      //弹出明细文本框确定
      this.dialogFormVisible1 = false;
      const selected = this.pro[this.radio];
      console.log(selected, 2222);
      this.user.poitems[this.choose].productCode = selected.productCode;
      this.user.poitems[this.choose].productName = selected.name;
      this.user.poitems[this.choose].unitName = selected.unitName;
    },

    del(index, row) {
      //添加明细——删除
      this.user.poitems.splice(index, 1);
      this.user.productTotal -= row.unitPrice * row.num;
    },
    pagination(page) {
      //分页
      axios({
        url: "/api/main/purchase/pomain/show",
        method: "get",
        params: {
          type: 1,
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
    handleEditAdd() {
      //点添加明细
      let obj = {
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: ""
      };
      this.user.poitems.push(obj);
    },
    proid(index) {
      //产品编号按钮
      this.dialogFormVisible1 = true;
      this.choose = index;
      console.log(this.choose);
    },
    detai(row) {
      //产品总价
      this.user.poitems.map(item => {
        item.itemPrice = item.num * item.unitPrice;
      });
      this.user.productTotal = this.user.poitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);
      this.user.poTotal =
        Number(this.user.productTotal) + Number(this.user.tipFee);
    },
    det() {
      //确定修改按钮
      axios
        .post("api/main/purchase/pomain/update", JSON.stringify(this.user), {
          headers: {
            Authorization: cookie.get("token"),
            "Content-Type": "application/json"
          }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          if (res.code == 2) {
            alert(`修改成功`);
            this.$router.push("/Neworders");
          }
        });
      this.dialogFormVisible = false;
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