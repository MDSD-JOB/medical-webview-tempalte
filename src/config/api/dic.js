import axios from '@utils/http/api'

export const getTmplate = params => {
  return axios({
    url: '/dic/getTmplate',
    method: 'get',
    param: params
  })
}

export const postTmplate = params => {
  return axios({
    url: '/dic/postTmplate',
    method: 'post',
    data: params
  })
}

export default { getTmplate, postTmplate }
