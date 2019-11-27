<template><!-- 主页 -->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <div class="mainindex">
      <div class="welinfo">
        <img src="../../images/sun.png" alt="天气" />
        <span> {{loginUser}}早上好，欢迎使用信息管理系统</span>
      </div>

      <div class="welinfo">
        <img src="../../images/time.png" alt="时间" />
        <span>
          您登录的时间：
          <span class="logTime">{{item}}</span>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Home",
  data(){
    return{
      item:""
    }
  },
   computed: {
    ...mapState(["loginUser"])
  }, 
  created() {
      this.item = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }
};
</script>

<style scoped>
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
.mainindex {
    padding: 20px;
    overflow: hidden;
}
.welinfo {
    height: 32px;
    line-height: 32px;
    padding-bottom: 8px;
}
.logTime{
  color: #066CAC;
}
</style>
