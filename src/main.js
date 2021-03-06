// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// Loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Bootstrap
import 'bootstrap';

import App from './App';
import router from './router';
import './bus';

library.add(fas);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

// 作為全域元件載入
Vue.component('Loading', Loading);
Vue.component("font-awesome-icon", FontAwesomeIcon);

axios.defaults.withCredentials = true; // 前端 axios 請求附帶 Cookies 設定

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

/**
 * 導航守衛
 * @param {Route} to  即將要進入的目標 (路由對象)
 * @param {Route} from 當前當前導航即將要離開的路由
 * @param {Function} next 調用該方法 resolve 這個 hook
 */
router.beforeEach((to, from, next) => {
  console.log(to.meta.requiresAuth);
  
  if(to.meta.requiresAuth) {
    console.log('此頁面需要登入');
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
        console.log(response.data);
        // 驗證已登入
        if(response.data.success) {
          next();
        }else {
          next({
            // 未登入則維持在登入頁
            path: '/login'
          })
        }
    });
  }else {
    next();
  }
});
