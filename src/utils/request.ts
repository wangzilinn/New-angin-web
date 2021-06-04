/*
 * @Description: 
 * @Author: Wang Zilin
 * @Date: 2021-06-01 23:25:31
 * @LastEditors: Wang Zilin
 * @LastEditTime: 2021-06-03 23:06:58
 */
import axios from 'axios'
import { ElMessageBox} from 'element-plus'
// import {store} from '../store/index'
// import { getToken } from './auth'

// create an axios instance
const service = axios.create({
  baseURL: <string> import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    // //   config.headers['Authorization'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    console.trace()
    return Promise.reject(error)
  }
)

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
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      console.log("返回状态码为" + res.code)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-user
        ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return res;
    } else {
      return res
    }
  },
  error => {
    console.log("request.js error" + error) // for debug
    return Promise.reject(error)
  }
)

export default service
