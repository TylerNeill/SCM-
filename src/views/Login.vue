<template>
  <div class="All">
    <div class="tally">
      <el-form ref="regForm" :model="user">
        <br />
        <div class="log_input">
          <el-input
            class="LogName"
            placeholder="登录用户名"
            prop="username"
            v-model="user.username"
            clearable
          ></el-input>
          <br />
          <el-input
            placeholder="请输入密码"
            type="password"
            prop="password"
            v-model="user.password"
            show-password
          ></el-input>
          <el-row class="log">
            <el-button type="primary" @click="login('user')">登录</el-button>
            <el-checkbox>记住我</el-checkbox>
            <a href>忘记密码</a>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      checked: false,
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入账号", trigger: "blur" }]
      }
    };
  },

  methods: {
    login() {
      if (this.user.username == "" || this.user.password == "") {
        alert("账号或密码不能为空");
        return;
      }
      // 分发action
      let pro = this.$store.dispatch("login", this.user);
      pro
        .then(result => {
          console.log(result);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
}
.tally {
  position: absolute;
  left: 50%;
  top: 30%;
  width: 630px;
  height: 285px;
  margin-left: -315px;
  margin-top: -144px;
  background: #fff;
  padding: 20px 30px 20px 30px;
  background-image: url("../images/logininfo.png");
}
h2 {
  font-weight: 200;
  margin-top: 25px;
  text-align: center;
}
h4 {
  font-weight: 100;
  text-align: center;
}
.el-button {
  width: 80px;
  height: 35px;
}
.log {
  margin-top: 30px;
  text-align: center;
}
.registe {
  margin-top: 30px;
  font-size: 13px;
}
.registe a {
  color: #76a7f5;
}
.log_input {
  margin: 60px 220px;
  font-size: 13px;
  width: 400px;
}
.LogName {
  margin-bottom: 20px;
}
.log_input a {
  text-decoration: none;
  color: #76a7f5;
}
.All {
  width: 1680px;
  height: 820px;
  background-image: url("../images/loginbg3.png");
}
</style>