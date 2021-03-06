import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
// import vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
// import md5 from 'js-md5';
import md5 from 'spark-md5'
import filemd5 from 'browser-md5-file'

//import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
//import CKEditor from '@ckeditor/ckeditor5-vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faDonate,
} from '@fortawesome/free-solid-svg-icons';

import {
    faThumbsUp,faStar
} from '@fortawesome/free-regular-svg-icons';

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//Vue.use(CKEditor);
Vue.use(ElementUI);
Vue.component('FAIcon', FontAwesomeIcon);

// Vue.prototype.$md5 = md5; // md5加密使用
Vue.prototype.$md5 = md5;
Vue.prototype.$filemd5 = filemd5;

library.add(
    faDonate,faThumbsUp,faStar
);


const baseURL = '/blog'
const baseURL2 = '/upload'
const baseURL3 = '/admin'

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    contentType : "application/json;charset=UTF-8"
  }
})

const axiosInstance2 = axios.create({
    baseURL: baseURL2,
    headers: {
        contentType : "application/json;charset=UTF-8"
    }
})

const axiosInstance3 = axios.create({
    baseURL: baseURL3,
    headers: {
        contentType : "application/json;charset=UTF-8"
    }
})


axiosInstance.defaults.withCredentials = true
axiosInstance2.defaults.withCredentials = true
axiosInstance3.defaults.withCredentials = true

Vue.prototype.axios = axiosInstance
Vue.prototype.$aaa = axiosInstance2
Vue.prototype.admin = axiosInstance3
Vue.config.productionTip = false
Vue.prototype.qs = qs

export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
