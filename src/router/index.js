import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Join from '../views/Join.vue'
import Profile from '../views/Profile.vue'
import Game from '../views/Game.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'router', redirect: "/home" },
    { path: '/home', name: 'home', component: Home },
    { path: '/join', name: 'join', component: Join },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/game', name: 'game', component: Game }
  ],
})

export default router
