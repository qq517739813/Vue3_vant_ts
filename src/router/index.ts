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
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' },
      },
      // 导入地图组件
      {
        path: '/map',
        name: 'Map',
        component: () => import('@/views/map/index.vue'),
        meta: { title: '地图', },
      },
      // 导入设备组件
      {
        path: '/equipment',
        name: 'Equipment',
        component: () => import('@/views/equipment/index.vue'),
        meta: { title: '设备' },
      },
      // 导入我的组件
      {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import('@/views/userInfo/index.vue'),
        meta: { title: '我的' },
      },
    ],
  },
  // 导入版本更新日志组件
  {
    path: '/versionManage',
    name: 'VersionManage',
    component: () => import('@/views/versionManage/index.vue'),
    meta: { title: '版本更新记录' },
  },
  // 导入报警设置组件
  {
    path: '/warnSetting',
    name: 'WarnSetting',
    component: () => import('@/views/warnSetting/index.vue'),
    meta: { title: '报警设置' },
  },
  // 导入气象站、土壤墒情站、监测数据数据组件
  {
    path: '/MonitorData/:FunCode',
    name: 'MonitorData',
    component: () => import('@/views/monitorData/index.vue'),
    meta: { title: '实时数据'},
  },
  // 导入气象站、土壤墒情站、监测数据数据组件图表组件
  {
    path: '/MonitorData/HistoryData',
    name: 'MonitorHistoryData',
    component: () => import('@/views/monitorData/monitorHistoryData/index.vue'),
    meta: { title: '历史数据曲线'},
  },
  // 导入摄像机(视频直播)组件
  {
    path: '/VideoData/:FunCode',
    name: 'VideoData',
    component: () => import('@/views/videoData/index.vue'),
    meta: { title: '视频监控' },
  },
  // 导入虫情测报仪(虫情测报)组件
  {
    path: '/PestLamp/:FunCode',
    name: 'PestLamp',
    component: () => import('@/views/pestLamp/index.vue'),
    meta: { title: '虫情测报' },
  },
  // 导入杀虫灯(虫情监测)组件
  {
    path: '/KillPestLamp/:FunCode',
    name: 'KillPestLamp',
    component: () => import('@/views/killPestLamp/index.vue'),
    meta: { title: '虫情监测' },
  },
  // 导入灌溉阀门(智能灌溉)组件
  {
    path: '/AutoIrrigate/:FunCode',
    name: 'AutoIrrigate',
    component: () => import('@/views/autoIrrigate/index.vue'),
    meta: { title: '智能灌溉' },
  },
  // 导入数据分析组件
  {
    path: '/AnalyzeData/:FunCode',
    name: 'AnalyzeData',
    component: () => import('@/views/analyzeData/index.vue'),
    meta: { title: '数据分析' },
  },
  // 导入预警统计组件
  {
    path: '/WarnData/:FunCode',
    name: 'WarnData',
    component: () => import('@/views/warnData/index.vue'),
    meta: { title: '预警统计' },
  },
  // 导入预警通知组件
  {
    path: '/WarnMsgData/:FunCode',
    name: 'WarnMsgData',
    component: () => import('@/views/warnMsgData/index.vue'),
    meta: { title: '预警通知' },
  },
  // 导入施肥机(水肥控制)组件
  {
    path: '/Fertilizer/:FunCode',
    name: 'Fertilizer',
    component: () => import('@/views/fertilizer/index.vue'),
    meta: { title: '施肥机' },
  },
  // 导入控制器(智能控制)组件
  {
    path: '/AutoControl/:FunCode',
    name: 'AutoControl',
    component: () => import('@/views/autoControl/index.vue'),
    meta: { title: '智能控制' },
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
  // 我的-编辑资料 页面路由
  // 我的-编辑资料 页面路由
  {
    path: '/EditData',
    name: 'EditData',
    component: () => import('@/views/editdata/index.vue'),
    meta: { title: '编辑资料' },
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
