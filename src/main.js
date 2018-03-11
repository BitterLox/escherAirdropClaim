// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
import App from './App'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    Notifications
  },
  directives: {
    VueClipboard
  }
})
