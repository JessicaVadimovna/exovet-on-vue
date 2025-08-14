import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./components/Home.vue') },
  { path: '/about', component: () => import('./components/About.vue') },
  { path: '/services', component: () => import('./components/Services.vue') },
  { path: '/specialists', component: () => import('./components/Specialists.vue') },
  { path: '/gallery', component: () => import('./components/Gallery.vue') },
  { path: '/prices', component: () => import('./components/Prices.vue') },
  { path: '/contacts', component: () => import('./components/Contacts.vue') }
]

const router = createRouter({
  history: createWebHistory('/exovet-on-vue/'),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router

export { routes }
export type { RouteRecordRaw }