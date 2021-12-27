function formatter(type, val) {
  if (type === 'year') {
    return `${val}年`
  } else if (type === 'month') {
    return `${val}月`
  } else if (type === 'day') {
    return `${val}日`
  } else if (type === 'hour') {
    return `${val}时`
  } else if (type === 'minute') {
    return `${val}分`
  }
  return val
}

export default {
  formatter
}
