import * as types from './mutations-types'
import { setLocalStorage } from '@utils/localStorage'

export default {
  [types.SET_AIDFORM](state, data) {
    setLocalStorage('aidForm', data)
    state.aidForm = data
  }
}
