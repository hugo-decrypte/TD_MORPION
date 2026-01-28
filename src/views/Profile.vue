<template>
  <div class="profile">
    <h1>Mon profil</h1>

    <form @submit.prevent="saveProfile" v-if="user">
      <div>
        <label>Nom</label>
        <input type="text" v-model="user.name" />
      </div>

      <div>
        <label>Email</label>
        <input type="email" v-model="user.email" />
      </div>

      <div v-if="errors.length">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>

      <button type="submit">Enregistrer</button>
    </form>

    <router-link to="/home">← Retour à l’accueil</router-link>
  </div>
</template>

<script>
import api from '../api/index.js'

export default {
  data() {
    return {
      user: null,
      errors: []
    }
  },

  beforeRouteEnter(to, from, next) {
    api.get('/api/profile')
      .then(response => {
        next(vm => {
          vm.user = response.data
        })
      })
  },

  methods: {
    saveProfile() {
      this.errors = []

      api.put('/api/profile', this.user)
        .then(() => {
          alert('Profil enregistré avec succès')
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
