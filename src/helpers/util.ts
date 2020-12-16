const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // console.log(Object.prototype.toString(new Date()));
  // 返回 "[object Object]"
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // 注意 null 也是一个object
  return val !== null && typeof val === 'object'
}
