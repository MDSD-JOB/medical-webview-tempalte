import * as types from './mutations-types'
import { setLocalStorage } from '@utils/localStorage'

export default {
  [types.SET_FORM](state, data) {
    setLocalStorage('form', data)
    state.form = data
  }
}
