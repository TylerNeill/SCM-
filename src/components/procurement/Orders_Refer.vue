<template>
  <!--采购查询  -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Neworders' }">采购管理</el-breadcrumb-item>
            <el-breadcrumb-item>采购单查询</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!-- 查询导航 -->
    <div style="margin:10px;">
      <el-row :gutter="20">
        <el-col :span="4" label="设置时间">
          <el-date-picker
            v-model="user.startDate"
            type="datetime"
            placeholder="选择开始时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>

        <el-col :span="4" label="设置时间">
          <el-date-picker
            v-model="user.endDate"
            type="datetime"
            placeholder="选择截至时间"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>

        <el-col :span="4">
          <el-input v-model="user.poId" @input="search" style="width:200px;" placeholder="采购单编号"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="user.payType" placeholder="付款方式">
            <el-option
              v-for="(item,index) in Type"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="user.status" placeholder="采购单处理状态" @change="search">
            <el-option
              v-for="(item,index) in statu"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" class="el-icon-edit-outline" @click="sup()">选择供应商</el-button>
          
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-col>
      </el-row>

      <!-- 选择供应商弹窗 -->
      <el-dialog title="选择供应商" :visible.sync="dialogFormVisible"  width="700px">
        <el-table :data="show" border style="width: 90%;" class="tableStyle">
          <el-table-column prop="venderCode" label="供应商编号"></el-table-column>
          <el-table-column prop="name" label="供应商名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleClick(scope.row)" size="small">确认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          @current-change="pagination"
        ></el-pagination>
      </el-dialog>

      <el-row style=" margin-top: 20px;">
        <el-col :span="24">
          <el-table border :data="showTwo" >
            <el-table-column label="序号" type="index" width="100"></el-table-column>
            <el-table-column label="采购单编号" prop="poId"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="供应商名称" prop="venderName"></el-table-column>
            <el-table-column label="附加费用" prop="tipFee"></el-table-column>
            <el-table-column label="采购产品总价" prop="productTotal"></el-table-column>
            <el-table-column label="采购单总价格" prop="poTotal"></el-table-column>
            <el-table-column label="付款方式">
              <template slot-scope="scope">
                <span>{{scope.row.payType|text}}</span>
              </template>
            </el-table-column>
            <el-table-column label="最低预付款金额" prop="prePayFee"></el-table-column>
            <el-table-column label="处理状态">
              <template slot-scope="scope">
                <span>{{scope.row.status | status}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="into(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        @current-change="paginationTwo"
      ></el-pagination>
    </div>

    <!-- 查看 -->
    <el-dialog title="采购单详细信息" :visible.sync="dialogVisible" width="60%">
      <h1>采购单主信息</h1>
      <el-table border :data="showThree">
        <el-table-column label="采购单编号" prop="poId"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="供应商名称" prop="venderName"></el-table-column>
        <el-table-column label="附加费用" prop="tipFee"></el-table-column>
        <el-table-column label="采购产品总价" prop="productTotal"></el-table-column>
        <el-table-column label="采购单总价格" prop="poTotal"></el-table-column>
        <el-table-column label="付款方式">
          <template slot-scope="scope">
            <span>{{scope.row.payType|text}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低预付款金额" prop="prePayFee"></el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | status}}</span>
          </template>
        </el-table-column>
      </el-table>

      <h1>采购单入库信息</h1>
      <el-table :data="showThree" border>
        <el-table-column label="入库时间" prop="stockTime"></el-table-column>
        <el-table-column label="入库操作用户" prop="stockUser"></el-table-column>
      </el-table>
      <div v-if="flag">
        <h1>采购单预付信息</h1>
        <el-table :data="showThree" border>
          <el-table-column label="预付时间" prop="prePayTime"></el-table-column>
          <el-table-column label="预付操作用户" prop="prePayUser"></el-table-column>
        </el-table>
      </div>

      <h1>采购单付款信息</h1>
      <el-table :data="showThree" border>
        <el-table-column label="付款时间" prop="payTime"></el-table-column>
        <el-table-column label="付款操作用户" prop="payUser"></el-table-column>
      </el-table>

      <h1>所属采购单明细信息</h1>
      <el-table :data="detail" border>
        <el-table-column label="产品编号" prop="productCode"></el-table-column>
        <el-table-column label="产品名称" prop="productName"></el-table-column>
        <el-table-column label="产品数量单位" prop="unitName"></el-table-column>
        <el-table-column label="产品数量" prop="num"></el-table-column>
        <el-table-column label="采购单价" prop="unitPrice"></el-table-column>
        <el-table-column label="产品明细总价" prop="itemPrice"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  name: "Orders_Refer",
  data() {
    return {
      total: 0,
      dialogVisible: false,
      show: [], //供应商对话框
      showTwo: [], //显示页面
      showThree: [], //查看详情
      detail: [],
      user: {
        poId: "",
        startDate: "",
        endDate: "",
        payType: "",
        venderCode: "",
        status: ""
      },
      Type: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      statu: [
        { value: 1, label: "新增" },
        { value: 2, label: "已收货" },
        { value: 3, label: "已付款" },
        { value: 4, label: "已了结" },
        { value: 5, label: "已预付" }
      ],
      dialogFormVisible: false,
      flag: false,
      // rep:[],

      pickerOptions: {
        // 日期时间控件设置
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    search() {
      //过滤
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          payType: this.user.payType,
          status: this.user.status,
          venderCode: this.user.venderCode,
          startDate: this.user.startDate,
          endDate: this.user.endDate,
          poId: this.user.poId
        }
      })
        .then(res => {
          this.total = res.data.total;
          this.showTwo = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    sup() {
      // 选择供应商
      this.dialogFormVisible = true;
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
    pagination(page) {
      //供应商分页
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

    handleClick(row) {
      //供应商对话框确认
      this.dialogFormVisible=false;
      this.user.venderCode = row.venderCode;
      console.log(this.user.venderCode);
    },

    paginationTwo(page) {
      //外部分页
      axios({
        url: "/api/main/purchase/vender/show",
        method: "get",
        params: {
          payType: this.user.payType,
          status: this.user.status,
          venderCode: this.user.venderCode,
          startDate: this.user.startDate,
          endDate: this.user.endDate,
          poId: this.user.poId,
          page: page
        }
      })
        .then(res => {
          this.showTwo = res.data.list;
          console.log(this.show);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    into(row) {
      // 查看
      // console.log(row);
      this.dialogVisible = true;
      if (row.payType == 3) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      axios({
        url: "/api/main/purchase/pomain/query",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          this.showThree = res.data.list;
          console.log(rep)
          // console.log(this.rep);
        })
        .catch(err => {
          console.log(err);
        });

      axios({
        url: "/api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: row.poId
        }
      })
        .then(res => {
          this.showThree = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    empty() {
      (this.user.status = ""),
        (this.user.startDate = ""),
        (this.user.endDate = ""),
        (this.user.venderCode = ""),
        (this.user.payType = ""),
        (this.user.poId = ""),
        (this.total = 0),
        (this.showTwo = []);
    }
  },
  filters: {
    text(value) {
      if (value == 1) {
        return (value = "货到付款");
      }
      if (value == 2) {
        return (value = "款到发货");
      }
      if (value == 3) {
        return (value = "预付款到发货");
      }
    },
    status(value) {
      if (value == 1) {
        return (value = "新增");
      }
      if (value == 2) {
        return (value = "已收货");
      }
      if (value == 3) {
        return (value = "已付款");
      }
      if (value == 4) {
        return (value = "已了结");
      }
      if (value == 5) {
        return (value = "已预付");
      }
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
</style>