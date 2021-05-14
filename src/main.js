import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import draggable from 'vuedraggable'
import 'element-ui/lib/theme-chalk/index.css'
import rawDisplayer from './components/infra/raw-displayer'
Vue.component('draggable', draggable)
Vue.component('rawDisplayer', rawDisplayer)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
