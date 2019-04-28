import request from '@/plugin/axios'

export function testConn (data) {
  // return request.post('/testConnection', data)
  return request({
    url: '/testConnection',
    method: 'post',
    data
  })
}
