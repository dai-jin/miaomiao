import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.filter("setWH",(url, args)=>{
  return url.replace(/w\.h/, args)
})
Vue.component("Scroller",Scroller)
Vue.component("Loading",Loading)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
