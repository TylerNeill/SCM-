import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

const qs = require('querystring')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: Cookies.get('username'),
    token: Cookies.get('token')
},
mutations: { //同步数据放到这里
  setLogin(state, payload){
    state.loginUser = payload
},
setToken(state, payload){
    state.token = payload
}
},
actions: { //异步数据放到这里 axios一般都异步
  login({commit}, payload){
    return new Promise((resolve, reject) => {
        axios({
            url: '/api/sys/login',
            method: 'post',
            data: qs.stringify(payload)
        }).then(resp => {
            console.log(resp)
            let result = resp.data;
            if(result.code===2){
                // 提交mutation:更改state
                commit('setLogin', result.data.user.account)
                commit('setToken', result.data.token)

                // Cookie存储
                Cookies.set('username', result.data.user.account)
                Cookies.set('token', result.data.token)

                // sessionStorage.setItem('account', result.data.user.nickname);
                resolve(result.data)
            }else{
                reject(result.message)
            }
        }).catch(error => {
            console.log(error);
            reject(error)
        })
    })
}
}
})