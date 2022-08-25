import Vue from "vue";
import Router from "vue-router"
Vue.use(Router)
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/',
        neme: 'layout',
        component: () => import('@/views/layout'),
        children: [
            {
                path: '/home', // 默认子路由
                name: 'home',
                component: () => import('@/views/home')
            },
            {
                path: '/qa',
                name: 'qa',
                component: () => import('@/views/qa')
            },
            {
                path: '/video',
                name: 'video',
                component: () => import('@/views/video')
            },
            {
                path: '/my',
                name: 'my',
                component: () => import('@/views/my')
            }
        ]

    }
]
const router = new Router({ routes })



export default router