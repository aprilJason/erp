import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/excel/export-excel'
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/export-excel',
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: '客户回程单', icon: 'excel' }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/product-excel',
    children: [
      {
        path: 'product-excel',
        component: () => import('@/views/excel/product-excel'),
        name: '工厂生产单',
        meta: { title: '工厂生产单', icon: 'excel' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: '生产单',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: '客户回程单' }
  //     },
  //     {
  //       path: 'product-excel',
  //       component: () => import('@/views/excel/product-excel'),
  //       name: '工厂生产单',
  //       meta: { title: '工厂生产单' }
  //     }
  //     // {
  //     //   path: 'export-selected-excel',
  //     //   component: () => import('@/views/excel/select-excel'),
  //     //   name: 'SelectExcel',
  //     //   meta: { title: 'Export Selected' }
  //     // },
  //     // {
  //     //   path: 'export-merge-header',
  //     //   component: () => import('@/views/excel/merge-header'),
  //     //   name: 'MergeHeader',
  //     //   meta: { title: 'Merge Header' }
  //     // },
  //     // {
  //     //   path: 'upload-excel',
  //     //   component: () => import('@/views/excel/upload-excel'),
  //     //   name: 'UploadExcel',
  //     //   meta: { title: 'Upload Excel' }
  //     // }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
