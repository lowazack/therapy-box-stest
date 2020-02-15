import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue} from 'bootstrap-vue'
import './custom.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'es6-promise/auto'
import store from './stores/index'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.mixin({
    data: function () {
        return {
            get endpoint() {
                return "http://localhost:4000";
            },

            getUserID() {
                return null
            }
        }
    }
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
