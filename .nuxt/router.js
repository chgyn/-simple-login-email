import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3a709612 = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _9fb2a1bc = () => interopDefault(import('../pages/dashboard/_id.vue' /* webpackChunkName: "pages/dashboard/_id" */))
const _0a7304ac = () => interopDefault(import('../pages/Login.vue' /* webpackChunkName: "pages/Login" */))
const _6d4d7c96 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _3a709612,
    name: "dashboard",
    children: [{
      path: ":id?",
      component: _9fb2a1bc,
      name: "dashboard-id"
    }]
  }, {
    path: "/Login",
    component: _0a7304ac,
    name: "Login"
  }, {
    path: "/",
    component: _6d4d7c96,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
