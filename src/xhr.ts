import { AxiosRequestConfig } from './types'

export default function(config: AxiosRequestConfig) {
  const { url, data = null, method = 'get' } = config
  const request = new XMLHttpRequest()

  // 参数三
  // 一个可选的布尔参数，表示是否异步执行操作，默认为true。如果值为false，send()方法直到收到答复前不会返回。如果true，已完成事务的通知可供事件监听器使用。如果multipart属性为true则这个必须为true，否则将引发异常。
  request.open(method.toUpperCase(), url, true)


  request.send(data)
}
