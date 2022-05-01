import { Response } from './type/Response';
import request from '../utils/request'
import { LifeLog } from './type/LifeLog';

export function addLifeLog(lifelog:LifeLog):Promise<Response<boolean>>{
  return <Promise<any>> request({
    url: `/api/lifelog/add`,
    method: 'post',
    data:lifelog
  })
}

export function getLifeLogSummary():Promise<Response<boolean>>{
  return <Promise<any>> request({
    url: `/api/lifelog/summary?random=`+ Math.random(),
    method: `get`
  })
}