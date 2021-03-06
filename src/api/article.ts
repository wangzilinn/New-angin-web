import { AxiosPromise } from 'axios';
import request from '../utils/request'
import { Article, ArticleDigest} from './type/Article';
import { Query,PageQuery } from "./type/Request";
import { Page, Response } from './type/Response';


//第一个参数是查询的页数据, 第二个是具体的查询参数,格式为:
//[[条件1:value1],[条件2:value2]]
//当不传入第二个参数时 则为undefined
export function getArticlePage(pageData:PageQuery, query:Query[]): AxiosPromise<Page<ArticleDigest>> {
  let added = ``
  if (query !== undefined) {
    query.forEach(function (item){
      added += `&${item.key}=${item.value}`;
    })
  }
  return request({
    url: `/api/article/list?page=${pageData.page}&limit=${pageData.limit}${added}`,
    method: 'get',
  })
}


export function findArchives() {
  return request({
    url: `/api/article/archives`,
    method: 'get'
  })
}

//首页点击文章标题后跳转使用这个函数
export function findArticleById(id:string): Promise<Response<Article>>{
  return <Promise<any>> request({
    url: `/api/article?id=${id}`,
    method: 'get'
  })
}

export function updateArticle(data:Article): Promise<Response<Article>> {
  return <Promise<any>> request({
    url: `/api/article`,
    method: 'put',
    data
  })
}

export function addArticle(data:Article): Promise<Response<Article>> {
  return <Promise<any>> request({
    url: `/api/article`,
    method: 'post',
    data
  })
}

export function deleteArticle(id:string) {
  return request({
    url: `/api/article?id=${id}`,
    method: 'delete'
  })
}
