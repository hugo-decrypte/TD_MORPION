<script>
import { useRouter } from 'vue-router'
import api from '../api/index.js'

const router = useRouter()

const goToProfile = () => {
  router.push({ name: 'profile' })
}

export default {
  data() {
    return {
      gameId: null
    }
  },

  methods: {
    createGame() {
      this.errors = []
      api.post('/api/games')
        .then((response) => {
          this.gameId = response.data['id']
          alert('Partie créée')
          this.$router.push({ name: 'game', params: { id: this.gameId } })
        })
        .catch(error => {
          if (error.response && error.response.data.errors) {
            this.errors = error.response.data.errors
          } else {
            this.errors = ['Une erreur est survenue']
          }
        })
    }
  }
}
</script>

<template>
  <h1>TEST</h1>
  <router-link to="/profile">Mon profil</router-link>
  <br>
  <button v-on:click="createGame()">Nouvelle partie</button>
  <br>
  <router-link to="/">Rejoindre une partie</router-link>
</template>

<style scoped>

</style>
