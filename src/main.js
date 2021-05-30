import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './plugins/router'
import * as firebase from './plugins/firebase'
import store from './plugins/store'


Vue.config.productionTip = false

new Vue({
  vuetify,
  store: store,
  router,
  firebase,
  render: h => h(App)
}).$mount('#app')
