import { DataStruct } from '../components/github-contributions-canvas';
import request from '../utils/request'
import { UserCredential } from './type/Request'
import { Response } from './type/Response';

// 用户登录
export function signIn(userCredential: UserCredential): Promise<Response<any>> {
  return <Promise<any>> request({
    url: '/api/user/signIn',
    method: 'post',
    data:userCredential
  })
}

export function kaptcha(){
  return <Promise<any>> request({
    url: '/api/kaptcha',
    method: 'get',
    responseType: 'arraybuffer'
  })
}

export function signUp(userCredential: UserCredential, kaptcha: string): Promise<Response<any>> {
  return <Promise<any>> request({
    url: '/api/user/signUp?kaptcha=' + kaptcha,
    method: 'post',
    data: userCredential
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function update(userCredential: UserCredential): Promise<Response<any>> {
  return <Promise<any>> request({
    url: '/api/user',
    method: 'put',
    data: userCredential
  })
}

export function getGithubInfo(username: string): Promise<Response<DataStruct>> {
  return <Promise<any>> request({
    url:"/api/user/github/" + username,
    method: 'get'
  })
}
