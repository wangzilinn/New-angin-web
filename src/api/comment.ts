import request from '../utils/request'
import { Comment } from "./type/Comment"
import { Query, PageQuery } from './type/Request'
import { Response, Page } from "./type/Response"
import { AxiosPromise } from 'axios'


export function addComment(data: Comment): Promise<Response<Comment>>{
  return <Promise<any>> request({
    url: `/api/comment`,
    method: 'post',
    data
  })
}

export function deleteComment(id: string) {
  return request({
    url: `/api/comment/${id}`,
    method: 'delete'
  })
}


//这个函数是查询评论时用的
//第一个参数是查询的页数据, 第二个是具体的查询参数,格式为:
//[{key:关键字1,value:限制1},{key:关键字2,value:限制2}]
//如:[{key:"id", value : this.$route.params.id}]
//当不传入第二个参数时 则为undefined
export function getCommentList(pageQuery: PageQuery, query: Query[]): Promise<Response<Page<Comment>>>{
  let added = ``
  if (query !== undefined) {
    query.forEach(function (item){
      added += `&${item.key}=${item.value}`;
    })
  }
  return <Promise<any>> request({
    url: `/api/comment/list?page=${pageQuery.page}&limit=${pageQuery.limit}${added}`,
    method: 'get',
  })
}
//export function getContributionData() {
//  return request({
//    url:
//  })
//}

export function getListForAbout(page: number): Promise<Response<Page<Comment>>>{
  return <Promise<any>>  request({
    url: `/api/comment/list?page=${page}&about=true`,
    method: 'get'
  })
}

export function getListForLink(page: number): Promise<Response<Page<Comment>>> {
  return <Promise<any>>  request({
    url: `/api/comment/listForLink?page=${page}`,
    method: 'get'
  })
}


export function findAllComments(): Promise<Response<Page<Comment>>> {
  return <Promise<any>> request({
    url: `/api/comment/findAll`,
    method: 'get'
  })
}




