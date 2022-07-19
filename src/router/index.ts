import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),

  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // 重定向 goods
    redirect: "goods",
    children: [
      {
        path: "/goods",
        name: "goods",
        meta: {
          isShow: true,
          title: "商品列表"
        },
        component: () => import(/* webpackChunkName: "goods" */ '../views/GoodsView.vue'),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          isShow: true,
          title: "用户列表"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue'),
      },
      {
        path: "/role",
        name: "rloe",
        meta: {
          isShow: true,
          title: "角色列表"
        },
        component: () => import(/* webpackChunkName: "RoleView" */ '../views/RoleView.vue'),
      },
      {
        path: "/authority",
        name: "authority",
        meta: {
          isShow: false,
          title: "权限列表"
        },
        component: () => import(/* webpackChunkName: "AuthorityView" */ '../views/AuthorityView.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token")
  // console.log(token);
  if (!token && to.path != "/login") {
    next("/login")
  } else {
    next()
  }
})

export default router
