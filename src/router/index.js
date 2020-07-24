import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from "firebase/app";
import {unregister} from "register-service-worker";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            layout: 'main',
            auth: true
        },
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            layout: 'empty'
        },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            layout: 'empty'
        },
        component: () => import('../views/Register.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        meta: {
            layout: 'main',
            auth: true
        },
        component: () => import('../views/Categories.vue')
    },
    {
        path: '/history',
        name: 'history',
        meta: {
            layout: 'main',
            auth: true
        },
        component: () => import('../views/History.vue')
    },
    {
        path: '/detail-record/:id',
        name: 'detail-record',
        meta: {
            layout: 'main',
            auth: true
        },
        component: () => import('../views/DetailRecord.vue')
    },
    {
        path: '/planning',
        name: 'planning',
        meta: {
            layout: 'main',
            auth: true
        },
        component: () => import('../views/Planning.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            layout: 'main',
            auth: true
        },
        component: () => import('../views/Profile.vue')
    },
    {
        path: '/record',
        name: 'record',
        meta: {
            layout: 'main',
            auth: true
        },
        component: () => import('../views/Record.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(record => record.meta.auth)
    console.log(requireAuth)

    console.log(currentUser)

    if(requireAuth && !currentUser){
        next('/login?message=login')
    }else {
        next()
    }

})

export default router
