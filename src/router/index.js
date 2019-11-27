import Vue from 'vue'
import Router from 'vue-router'


//登录
import Login from '@/views/Login'
//主页面
import Index from '@/views/Index'
//404界面
import NotVisit from '@/views/NotVisit'
//用户管理
import Home from '@/components/Management/Home'
import User from '@/components/Management/User'
import Useradd from '@/components/Management/Useradd'
//采购管理
import Neworders from '@/components/procurement/Neworders'
import Orders_Refer from '@/components/procurement/Orders_Refer'
import Orders_Settle from '@/components/procurement/Orders_Settle'
import Supplier from '@/components/procurement/Supplier'
import OrdersAdd from '@/components/procurement/OrdersAdd'
import SupplierAdd from '@/components/procurement/SupplierAdd'
//仓储管理
import Out_in_Storage from '@/components/warehouse/Out_in_Storage'
import Put_in_Storage from '@/components/warehouse/Put_in_Storage'
import Query_Storage from '@/components/warehouse/Query_Storage'
import Take_Stock from '@/components/warehouse/Take_Stock'
import Take_Details from '@/components/warehouse/Take_Details'
//财务收支
import Balance_Query from '@/components/Finance/Balance_Query'
import Payment from '@/components/Finance/Payment'
import Proceeds from '@/components/Finance/Proceeds'
//销售管理
import Category from '@/components/Sales/Category'
import Model from '@/components/Sales/Model'
import CRM from '@/components/Sales/CRM'
import Finish_Sales from '@/components/Sales/Finish_Sales'
import NewAdd from '@/components/Sales/NewAdd'
import Query_Sales from '@/components/Sales/Query_Sales'
import Categoryadd from '@/components/Sales/Categoryadd'
import CRMadd from '@/components/Sales/CRMadd'
import Modeladd from '@/components/Sales/Modeladd'
import Detailadd from '@/components/Sales/Detailadd'

//业务报表
import Monthly_Balance_report from '@/components/report/Monthly_Balance_report'
import Monthly_inventory_report from '@/components/report/Monthly_inventory_report'
import Monthly_outbound_report from '@/components/report/Monthly_outbound_report'
import Monthly_purchase_report from '@/components/report/Monthly_purchase_report'
import Monthly_sales_report from '@/components/report/Monthly_sales_report'
import Monthly_warehousing_report from '@/components/report/Monthly_warehousing_report'
//网上销售
import order from '@/components/E-sales/order'
import products_show from '@/components/E-sales/products_show'
import Register from '@/components/E-sales/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        //管理信息
        {
          path: '/Home',
          name: 'Home',
          component: Home,
        },
        {
          path: '/Useradd',
          name: 'Useradd',
          component: Useradd,
        },
        {
          path: '/User',
          name: 'User',
          component: User,
        },

        //采购管理
        {
          path: '/Neworders',
          name: 'Neworders',
          component: Neworders,
        },
        {
          path: '/Orders_Refer',
          name: 'Orders_Refer',
          component: Orders_Refer,
        },
        {
          path: '/Orders_Settle',
          name: 'Orders_Settle',
          component: Orders_Settle,
        },
        {
          path: '/OrdersAdd',
          name: 'OrdersAdd',
          component: OrdersAdd,
        },
        {
          path: '/SupplierAdd',
          name: 'SupplierAdd',
          component: SupplierAdd,
        },
        {
          path: '/Supplier',
          name: 'Supplier',
          component: Supplier,
        },
        //仓管管理
        {
          path: '/Out_in_Storage',
          name: 'Out_in_Storage',
          component: Out_in_Storage,
        },
        {
          path: '/Put_in_Storage',
          name: 'Put_in_Storage',
          component: Put_in_Storage,
        },
        {
          path: '/Query_Storage',
          name: 'Query_Storage',
          component: Query_Storage,
        },
        {
          path: '/Take_Stock',
          name: 'Take_Stock',
          component: Take_Stock,
        },
        {
          path: '/Take_Details',
          name: 'Take_Details',
          component: Take_Details,
        },
        //销售管理
        {
          path: '/Detailadd',
          name: 'Detailadd',
          component: Detailadd,
        },
        {
          path: '/Model',
          name: 'Model',
          component: Model,
        },
        {
          path: '/CRM',
          name: 'CRM',
          component: CRM,
        },
        {
          path: '/Finish_Sales',
          name: 'Finish_Sales',
          component: Finish_Sales,
        },
        {
          path: '/NewAdd',
          name: 'NewAdd',
          component: NewAdd,
        },
        {
          path: '/Query_Sales',
          name: 'Query_Sales',
          component: Query_Sales,
        },
        {
          path: '/Category',
          name: 'Category',
          component: Category,
        },
        {
          path: '/Categoryadd',
          name: 'Categoryadd',
          component: Categoryadd,
        },
        {
          path: '/CRMadd',
          name: 'CRMadd',
          component: CRMadd,
        },
        {
          path: '/Modeladd',
          name: 'Modeladd',
          component: Modeladd,
        },
        //财务收支
        {
          path: '/Balance_Query',
          name: 'Balance_Query',
          component: Balance_Query,
        },
        {
          path: '/Payment',
          name: 'Payment',
          component: Payment,
        },
        {
          path: '/Proceeds',
          name: 'Proceeds',
          component: Proceeds,
        },
        //月度报表
        {
          path: '/Monthly_Balance_report',
          name: 'Monthly_Balance_report',
          component: Monthly_Balance_report,
        },
        {
          path: '/Monthly_inventory_report',
          name: 'Monthly_inventory_report',
          component: Monthly_inventory_report,
        },
        {
          path: '/Monthly_outbound_report',
          name: 'Monthly_outbound_report',
          component: Monthly_outbound_report,
        },
        {
          path: '/Monthly_purchase_report',
          name: 'Monthly_purchase_report',
          component: Monthly_purchase_report,
        },
        {
          path: '/Monthly_sales_report',
          name: 'Monthly_sales_report',
          component: Monthly_sales_report,
        },
        {
          path: '/Monthly_warehousing_report',
          name: 'Monthly_warehousing_report',
          component: Monthly_warehousing_report,
        },
        //网上销售
        {
          path: '/order',
          name: 'order',
          component: order,
        },
        {
          path: '/products_show',
          name: 'products_show',
          component: products_show,
        },
        {
          path: '/Register',
          name: 'Register',
          component: Register,
        },
        //404 
        {
          path: '/NotVisit',
          name: 'NotVisit',
          component: NotVisit,
        },

      ],
      redirect: "/home",
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
  ]
})
