import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { showFailToast } from 'vant';

// 为了首屏加载快，所以首页不使用懒加载
import Layout from '@/layout/index.vue';

// 自动扫描 modules 里面的路由模块，路由模块请根据业务自行拆分
const files = import.meta.glob('./modules/**/*.ts', { eager: true, import: 'default' });

const routes: RouteRecordRaw[] = [];
const whiteList = ['/login']; // no redirect whitelist

// 获取所有的路由内容
Object.keys(files).forEach((key: string) => {
  const file = files[key] as RouteRecordRaw;
  // 根据导出的内容判断是否数组，如果数组需使用扩展运算符
  if (Array.isArray(file)) {
    routes.push(...file);
  } else {
    routes.push(file);
  }
});

const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '智慧农场',
    },
  },
  {
    path: '/',
    redirect: '/home',
    name: 'Layout',
    component: Layout,
    meta: {
      title: '首页',
    },
    children: [
      // 导入首页组件
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' },
      },
      // 导入地图组件
      {
        path: '/map',
        component: () => import('@/views/map/index.vue'),
        meta: { title: '地图' },
      },
      // 导入设备组件
      {
        path: '/equipment',
        component: () => import('@/views/equipment/index.vue'),
        meta: { title: '设备' },
      },
      // 导入我的组件
      {
        path: '/userInfo',
        component: () => import('@/views/userInfo/index.vue'),
        meta: { title: '我的' },
      },
    ],
  },
  // 无权限页面
  {
    path: '/no-permission',
    name: 'NoPermission',
    component: () => import('@/views/error-page/no-permission/index.vue'),
    meta: {
      title: '访问无权限',
    },
  },
  // 404 页面路由
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error-page/404/index.vue'),
    meta: {
      title: '页面走丢了',
    },
  },
  {
    path: '/:catchAll(.*)', // 不识别的path自动匹配404
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [...constantRoutes, ...routes],
});

router.beforeEach((to, from, next) => {
  // window.document.title = to.meta.title as string;
  const userInfo = window.sessionStorage.getItem('userInfo');
  const Token = JSON.parse(userInfo as any)?.userInfo?.Token;
  if (Token) {
    if (to.path === '/login') {
      next();
    }
    next();
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    showFailToast({
      forbidClick: true,
      message: 'token已被清除,请重新登录',
      onClose: () => {
        next(`/login`);
      },
    });
  }
});

export default router;
