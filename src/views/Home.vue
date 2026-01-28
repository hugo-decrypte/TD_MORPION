<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProfile = () => {
  router.push({ name: 'profile' })
}
</script>

<template>
  <h1>TEST</h1>
  <router-link to="/game">Accès au jeu</router-link>

  <div>
    <h1>Accueil</h1>
    <button @click="goToProfile">MON PROFIL</button>
  </div>
</template>

<style scoped>

</style>
