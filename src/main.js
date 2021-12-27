import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'lib-flexible/flexible.js'

import './assets/styles/index.less'
import './assets/iconfonts/iconfont.css'

import './plugins/vant'
import components from './plugins/components'
import api from './utils/http'
import moment from 'vue-moment'
import _ from 'lodash'

import './components/common/MedSvg/index.js'

import Bridge from './utils/bridge.js'

Vue.prototype.$bridge = Bridge

Vue.prototype._ = _

Vue.use(moment)
Vue.use(components)
Vue.use(api)
Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
