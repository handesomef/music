import { createRouter, createWebHashHistory } from 'vue-router'

const Recommend = () => import('@/views/Recommend'/* webpackChunkName: "recommend" */)
const Singer = () => import('@/views/Singer'/* webpackChunkName: "singer" */)
const TopList = () => import('@/views/Top-list'/* webpackChunkName: "top-list" */)
const Search = () => import('@/views/Search'/* webpackChunkName: "search" */)
const SingerDetail = () => import('@/views/SingerDetail'/* webpackChunkName: "singer-detail" */)
const Album = () => import('@/views/Album'/* webpackChunkName: "album" */)
const TopDetail = () => import('@/views/Top-detail'/* webpackChunkName: "top-detail" */)
const UserCenter = () => import('@/views/UserCenter'/* webpackChunkName: "user-center" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  }, {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  }, {
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  }, {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  }, {
    path: '/user',
    components: {
      user: UserCenter
    },

  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
