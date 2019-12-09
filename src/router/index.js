import Vue from 'vue'
import VueRouter from 'vue-router'
var firebase = require("firebase/app");

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/registro',
      name: 'registro',
      component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "about" */ '../views/Inicio.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
      path: '/agregar',
      name: 'agregar',
      component: () => import(/* webpackChunkName: "about" */ '../views/Agregar.vue')
    },
    {
      path: '/editar/:id',
      name: 'editar',
      component: () => import(/* webpackChunkName: "about" */ '../views/Editar.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
  const usuario = firebase.auth().currentUser;
  if (rutaProtegida === true && usuario === null) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
