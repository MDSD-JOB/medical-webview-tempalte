import axios from 'axios'
import qs from 'qs'
import { Notify } from 'vant'
const config = {
  method: 'get',
  baseURL: window.GLOBAL_APP_API_BASE_URL || process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {},
  timeout: 10000,
  withCredentials: false,
  responseType: 'json'
}
const isProd = ['prod', 'production'].includes(process.env.NODE_ENV)
export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {},
      transformResponse: [function(data) {}]
    })

    instance.interceptors.request.use(
      config => {
        // TODO: 文件上传接口统一
        if (config.url.startsWith('/files')) {
          config.headers['Conten-Type'] = 'multipart/form-data;charse=UTF-8'
        } else {
          config.headers['Conten-Type'] = 'application/json;charset=utf-8'
        }

        //  TODO: 调取字典表接口统一
        if (config.url && config.url.substring(0, 5) === '/dic/') {
          config.baseURL = window.GLOBAL_APP_API_DIC_URL
        }

        if (
          config.method.toLocaleLowerCase() === 'get' ||
          config.method.toLocaleLowerCase() === 'put' ||
          config.method.toLocaleLowerCase() === 'delete'
        ) {
          config.data = qs.stringify(config.data)
        }

        return config
      },
      error => {
        if (
          error.code === 'ECONNABORTED' &&
          error.message.indexOf('timeout') !== -1
        ) {
          // return service.request(originalRequest);
        }
        const errorInfo = error.response

        if (errorInfo) {
          // error =errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status
          // eslint-disable-next-line
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break

            case 401:
              err.message = '未授权，请登录'
              break

            case 403:
              err.message = '拒绝访问'
              break

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break

            case 408:
              err.message = '请求超时'
              break

            case 500:
              err.message = '服务器内部错误'
              break

            case 501:
              err.message = '服务未实现'
              break

            case 502:
              err.message = '网关错误'
              break

            case 503:
              err.message = '服务不可用'
              break

            case 504:
              err.message = '网关超时'
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              break

            default:
          }
          Notify({ type: 'danger', message: err.message })
        }
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options)
      .then(res => {
        resolve(res)
        return false
      })
      .catch(error => {
        reject(error)
      })
  })
}
