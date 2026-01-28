import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
//import Home from '@views/Home.vue'
import Join from '../views/Join.vue'
import Profile from '../views/Profile.vue'
import Game from '../views/Game.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', name: 'home', component: Home },
    { path: '/', name: 'root', redirect: '/home' },
    { path: '/join', name: 'join', component: Join },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/game', name: 'game', component: Game }
  ],
})

export default router
