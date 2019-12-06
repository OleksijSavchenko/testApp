import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/ProductsTable.vue'
import CreateUpdateForm from '@/components/CreateUpdateForm.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    // component: () => import('@/components/CreateUpdateForm.vue') // the same component, using dynamic import not need
    component: CreateUpdateForm
  },
  {
    path: '/update/:productId',
    name: 'update',
    component: CreateUpdateForm
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
