import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import Main from '@/layout/main.vue'
import { getStorge } from '@/utils/auth'
import Home from "../pages/Home/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    meta: {
      title: '登录',
    },
  },
]

const router = new VueRouter({
  routes,
});

let asyncRouterFlag = 0
router.beforeEach(async (to: Route, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  if (to.path === '/login') {
    next()
  } else if (!getStorge('token')) {
    //如果不需要登录验证，或者已经登录成功，则直接放行
    //进入的不是登录路由
    next({ path: '/login' })
  } else {
    //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
    if (to.meta?.title) {
      document.title = to.meta.title
    }
    // 添加flag防止多次获取动态路由和栈溢出
    if (!asyncRouterFlag) {
      asyncRouterFlag++
      next({ path: to.path, replace: true })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  //...
})

export default router

