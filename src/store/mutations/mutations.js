import * as types from './mutations-types'
import storage from 'store'

export default {
  [types.SET_FORM](state, data) {
    storage.set('form', data)
    state.form = data
  }
}
