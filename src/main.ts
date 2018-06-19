import Vue from 'vue';
import Vuex from 'vuex';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/base.scss'; // 基础css
import '@/assets/style/elementUIBase.scss'; // 修改elementUI css
import '@/assets/style/components.scss'; // 组件 css
import '@/assets/style/page.scss'; // 页面 css


import App from './App.vue';
import router from './router'; // 路由
import store from './stores'; // 仓库

import components from '@/common/'; // 公共组件

Vue.use(ElementUI);
Vue.use(Vuex);
// 全局变量
Vue.prototype.pageSize = 20;

// 使用扩展组件
Vue.use(components);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h: any) => h(App),
}).$mount('#app');
