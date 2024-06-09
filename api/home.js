import request from '@utils/request'

export function fetchPosts(params) {
  return request({
    url: '/api/cast/list',
    method: 'post',
    params
  })
}
