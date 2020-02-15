import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from "../views/Signup";
import Dashbaord from "../views/Dashboard"
import Sport from "../views/Sport"
import Images from "../views/Images"

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/signup', name: 'Signup', component: Signup},
  { path: '/dashboard', name: 'Dasboard', component: Dashbaord},
  { path: '/sport', name: 'Sport', component: Sport},
  { path: '/images', name: 'Images', component: Images},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
