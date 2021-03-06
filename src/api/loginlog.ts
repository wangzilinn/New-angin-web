import request from '../utils/request'

export function getList(data, query) {
  return request({
    url: `/api/loginlog/list?page=${query.page}&limit=${query.limit}`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/api/loginlog/${id}`,
    method: 'delete'
  })
}
