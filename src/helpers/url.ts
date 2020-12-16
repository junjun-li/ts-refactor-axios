// 存放url的辅助函数
// 现在, 我们要讲 params 中的值, 拼接在url后面

// 1. 参数为数组
// params: {
//   foo: ['bar', 'baz']
// }
// /base/get?foo[]=bar&foo[]=baz

// 2. 参数是对象
// params: {
//   foo: {
//     bar: 'baz'
//   }
// }
// foo拼接的是{"bar": "baz"}encode的结果
// /base/get?foo=%7B%22bar%22:%22baz%22%7D

// 3. 参数是时间类型Date()
// const date = new Date()
// params: {
//   date
// }
// date后面拼接的是 date.toISOString() 的结果
// /base/get?date=2019-04-01T05:55:39.030Z

// 4. 我的axios支持特殊的字符串
// 例如 @ : $ , 空串 [ ] 都允许出现在url中, 不会被encode
// params: {
//   foo: '@:$, '
// }
// 把空串 转换成 "+" 号
// /base/get?foo=@:$+

// 5. 忽略undefined和null属性
// params: {
//   foo: 'bar',
//   baz: null
// }
// /base/get?foo=bar

// 6. 丢弃url中的哈希标记
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })
// 最终请求的 url 是 /base/get?foo=bar

// 7. 如果url中已经存在参数, 需要保存, 和params中的参数一起合并
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })
// 最终请求的 url 是 /base/get?foo=bar&bar=baz

import { isDate, isObject } from './util'

buildURL('/base/get', { name: '张三', age: 18 })

export function buildURL(url: string, params?: any): string {
  debugger
  if (!params) {
    return url
  }
  return url
  // 思路: 遍历 params 定义一个键值对数组 然后把遍历结果, key value的形式 push到键值对数组中 然后通过join拼接到url中

  const parts: string[] = []
  // 知识点1: forEach中的return是跳不出函数的, return指跳到下一次循环
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 处理对应的值, 把他们统一成数组, 方便我们进行处理
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    // 对这个值进行判断, 看看是否是对象类型,日期类型
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${key}=${val}`)
    })
  })
}














