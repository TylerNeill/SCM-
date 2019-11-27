<template>
  <div>
    <el-container>
      <el-header style="height: 100px;">
        <div class="header_left">
          <img src="../images/loginlogo.png" alt />
        </div>
        <div class="header_right">
          <i class="el-icon-user-solid"></i>
          {{loginUser}}
          <i class="el-icon-time"></i>系统时间：
          <span style="color:#ccc">{{item}}</span>
        </div>
      </el-header>
      <el-container style="height:700px;" router>
        <el-aside width="270px">
          <div class="cont">
            <p>
              <img src="../images/leftico.png" alt />
              菜单管理
            </p>
          </div>

          <el-row>
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#D4E7F0"
                text-color="#000"
                active-text-color="#ffd04b"
              >
                <el-submenu index="/Home">
                  <template slot="title">
                    <!-- <router-link to=""></router-link> -->
                    <i class="el-icon-notebook-2"></i>
                    <span>系统管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">
                      <router-link to="/user">
                        <i class="el-icon-caret-right"></i>
                        用户管理
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                      <router-link to="/Login">
                        <i class="el-icon-caret-right"></i>
                        重新登录
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                      <router-link to="/Login">
                        <i class="el-icon-caret-right"></i>
                        退出系统
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>采购管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">
                      <router-link to="/Supplier">
                        <i class="el-icon-caret-right"></i>
                        供应商管理
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                      <router-link to="/Neworders">
                        <i class="el-icon-caret-right"></i>
                        新添采购单
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                      <router-link to="/Orders_Settle">
                        <i class="el-icon-caret-right"></i>
                        采购单了结
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="2-4">
                      <router-link to="/Orders_Refer">
                        <i class="el-icon-caret-right"></i>
                        采购单查询
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>仓储管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">
                      <router-link to="/Put_in_Storage">
                        <i class="el-icon-caret-right"></i>
                        入库登记
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                      <router-link to="/Out_in_Storage">
                        <i class="el-icon-caret-right"></i>
                        出库登记
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="3-3">
                      <router-link to="/Take_Stock">
                        <i class="el-icon-caret-right"></i>
                        库存盘点
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="3-4">
                      <router-link to="/Query_Storage">
                        <i class="el-icon-caret-right"></i>
                        库存查询
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>财务收支</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="4-1">
                      <router-link to="/Proceeds">
                        <i class="el-icon-caret-right"></i>
                        收款登记
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="4-2">
                      <router-link to="/Payment">
                        <i class="el-icon-caret-right"></i>
                        付款登记
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="4-3">
                      <router-link to="/Balance_Query">
                        <i class="el-icon-caret-right"></i>
                        收支查询
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>销售管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="5-1">
                      <router-link to="/Category">
                        <i class="el-icon-caret-right"></i>
                        产品分类管理
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="5-2">
                      <router-link to="/Model">
                        <i class="el-icon-caret-right"></i>
                        产品管理
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="5-3">
                      <router-link to="/CRM">
                        <i class="el-icon-caret-right"></i>
                        客户管理
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="5-4">
                      <router-link to="/NewAdd">
                        <i class="el-icon-caret-right"></i>
                        新添销售单
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="5-5">
                      <router-link to="/Finish_Sales">
                        <i class="el-icon-caret-right"></i>
                        销售单了结
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="5-6">
                      <router-link to="/Query_Sales">
                        <i class="el-icon-caret-right"></i>
                        销售单查询
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>业务报表</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="6-1">
                      <router-link to="/Monthly_purchase_report">
                        <i class="el-icon-caret-right"></i>
                        月度采购报表
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="6-2">
                      <router-link to="/Monthly_Balance_report">
                        <i class="el-icon-caret-right"></i>
                        月度收支登记表
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="6-3">
                      <router-link to="/Monthly_warehousing_report">
                        <i class="el-icon-caret-right"></i>
                        月度入库报表
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="6-4">
                      <router-link to="/Monthly_outbound_report">
                        <i class="el-icon-caret-right"></i>
                        月度出库报表
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="6-5">
                      <router-link to="/Monthly_inventory_report">
                        <i class="el-icon-caret-right"></i>
                        产品库存报表
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="6-6">
                      <router-link to="/Monthly_sales_report">
                        <i class="el-icon-caret-right"></i>
                        月度销售报表
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>

                <el-submenu index="7">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>网上销售</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="7-1">
                      <router-link to="/Register">
                        <i class="el-icon-caret-right"></i>
                        网上注册
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="7-2">
                      <router-link to="/products_show">
                        <i class="el-icon-caret-right"></i>
                        商品展示
                      </router-link>
                    </el-menu-item>
                    <el-menu-item index="7-3">
                      <router-link to="/order">
                        <i class="el-icon-caret-right"></i>
                        网上下单
                      </router-link>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["loginUser"])
  }, 
  data() {
    return {
      item: "",
    };
  },
  created() {
    this.timeId = setInterval(() => {
      this.item = dayjs().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background: url("../images/topleft.jpg") no-repeat center;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.header_left {
  margin: 15px;
  float: left;
}
.header_right {
  float: right;
  border-radius: 25px;
  margin-top: 60px;
  color: #e9eef3;
  opacity: 0.8;
  background: #04537e;
  height: 28px;
}
a {
  text-decoration: none;
  color: #333;
}
.cont p {
  width: 249px;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  background: #3a94c8;
  color: #fff;
}
.el-aside {
  height: 100%;
  background: #f0f9fd;
}
.el-main{
  padding: 0;
}
</style>
