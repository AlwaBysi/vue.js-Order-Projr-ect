// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import socket from 'vue-socket.io'
import bootstrap from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueChart from 'vue-chartjs'
import resource from 'vue-resource-2'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.use(resource)
Vue.use(VueChart)
Vue.use(bootstrap)
// Vue.use(socket, 'localhost:8080/server.js')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
