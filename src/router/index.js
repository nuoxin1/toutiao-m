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
        // neme: 'layout',
        component: () => import('@/views/layout'),
        children: [
            {
                path: '', // 默认子路由
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

    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search')
    },
    {
        path: '/article/:articleId',  //动态路由 /:ariticleId  
        name: 'article',
        props: true, //
        component: () => import('@/views/article')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user')
    },
]
const router = new Router({ routes })



export default router