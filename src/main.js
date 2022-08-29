import Vue from 'vue'
import App from './App.vue'

import store from './store';
import Vant from 'vant';

import 'vant/lib/index.less';
import './utils/dayjs'
import './styles/index.css'
import router from './router';
import 'amfe-flexible'
Vue.use(Vant);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
