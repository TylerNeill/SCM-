//拦截器

import axios from 'axios'
import Cookies from 'js-cookie'


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config);
  // 添加请求头信息
  config.headers.Authorization = Cookies.get('token');
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let result = response.data;
  if (result.code === 1) {
    // console.log(window.location)
    alert(result.message)
    window.location = window.location.origin + '/#/Login'
  }
  return response;

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});