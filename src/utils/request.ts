/*
 * @Description:
 * @Author: Zillion Wang
 * @Date: 2021-06-01 23:25:31
 * @LastEditors: Zillion Wang
 * @LastEditTime: 2021-06-03 23:06:58
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {Response } from '../api/type/Response';
// import {store} from '../store/index'
// import { getToken } from './auth'

// create an axios instance
const service = axios.create({
  baseURL: <string>import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
});

// 请求拦截器
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    // //   config.headers['Authorization'] = getToken()
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    console.trace();
    return Promise.reject(error);
  }
);

service.defaults.withCredentials = true;

// 响应拦截器
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  // 如果http协议的状态码为200,则到这里:
  (response:AxiosResponse<any>) => {
    const res = response.data;
    // 这里返回的是自定义的状态码
    if (res.code !== undefined && res.code !== 200) {
      console.log("返回状态码为" + res.code);
      console.log("错误信息为" + res.msg);
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  // 如果http协议的状态码不为200,则到这里
  (error) => {
    console.log("request.js error" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
