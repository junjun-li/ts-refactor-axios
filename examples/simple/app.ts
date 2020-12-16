import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    name: '张三',
    age: [ new Date(), 10, '年纪' ]
  }
})





