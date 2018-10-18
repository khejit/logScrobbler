import Vue from "vue";
import Router from "vue-router";
import Start from "./components/Start";
import Logged from './components/Logged';

Vue.use(Router)

let router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'start',
            component: Start
        },
        {
            path: '/logged',
            name: 'logged',
            component: Logged,
            meta: {
                requiresSession: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresSession) && !localStorage.getItem('session')) {
        next({ name: 'start' })
    } else if(to.name === 'start' && localStorage.getItem('session') ){
        next({name: 'logged'})
    } else {
        next()
    }
})

export default router;