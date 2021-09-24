import request from '../utils/request'
import { Category } from './type/Article'
import { PageQuery } from "./type/Request"
import { Response } from './type/Response';

export function getAllCategories(): Promise<Response<Category[]>> {
  return <Promise<any>> request({
    url: `/api/article/category/list`,
    method: 'get'
  })
}

//第一个参数是查询的页数据, 第二个是具体的查询参数,格式为:
//[[条件1:value1],[条件2:value2]]
//当不传入第二个参数时 则为undefined
export function getCategoriesList(pageData?:PageQuery): Promise<Response<Category[]>>{
  let added = ''
  if (pageData != null) {

    added = "?page=" + pageData.page + "&limit=" + pageData.limit
  }
  return <Promise<any>> request({
    url: `/api/article/category/list` + added,
    method: 'get',
  });
}

export function findCategoryById(id: string): Promise<Response<Category>> {
  return <Promise<any>> request({
    url: `/api/article/category/${id}`,
    method: 'get'
  })
}

export function updateCategory(data: Category) {
  return <Promise<any>> request({
    url: `/api/article/category`,
    method: 'put',
    data
  })
}

export function addCategory(data) {
  return <Promise<any>> request({
    url: `/api/category`,
    method: 'post',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `/api/category/${id}`,
    method: 'delete'
  })
}
