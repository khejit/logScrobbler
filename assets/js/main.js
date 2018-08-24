import Vue from 'vue';
import router from './router';
require('./components/global');

new Vue({
    router,
    template: `<router-view></router-view>`
}).$mount('#vueApp');