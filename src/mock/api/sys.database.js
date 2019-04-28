export default [
  {
    path: 'api/testConnection',
    method: 'post',
    handle () {
      return {
        code: 0,
        msg: 'success',
        data: {
          'test': '测试成功'
        }
      }
    }
  }
]
