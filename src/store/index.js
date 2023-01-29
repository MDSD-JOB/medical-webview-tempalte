import Vue from 'vue'
import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
import modules from './modules'

Vue.use(Vuex)

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
export default () => {
  return new Vuex.Store({
    strict: IS_PROD,
    state: defaultState,
    modules,
    mutations,
    actions,
    getters
  })
}
