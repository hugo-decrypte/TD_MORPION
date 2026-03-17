<template>
  <div class="container">
    <h1>Rejoindre une partie</h1>

    <form @submit.prevent="joinGame" class="form">
      <div class="form-group">
        <label for="code">Code de la partie</label>
        <input type="text" id="code" v-model="gameCode" placeholder="Entrez le code de la partie" required/>
      </div>

      <ErrorDisplay :errors="errors" />

      <button type="submit">Rejoindre</button>
    </form>

    <router-link to="/home" class="back-link">← Retour à l'accueil</router-link>
  </div>
</template>

<script>
import api from '../api/index.js'
import ErrorDisplay from '../views/ErrorDisplay.vue'

export default {
  components: {
    ErrorDisplay
  },
  data() {
    return {
      gameCode: '',
      errors: []
    }
  },

  methods: {
    joinGame() {
      this.errors = []

      api.patch(`/api/games/${this.gameCode}/join`)
        .then((response) => {
          const gameId = response.data.id
          this.$router.push({ name: 'game', params: { id: gameId } })
        })
        .catch(error => {
          if (error.response && error.response.data.errors) {
            this.errors = Object.values(error.response.data.errors).flat()
          } else if (error.response && error.response.status === 404) {
            this.errors = ['Ce code de partie n\'existe pas']
          } else {
            this.errors = ['Erreur lors de la connexion au serveur']
          }
        })
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #21242a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 0.8s ease;
}

.form {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  min-width: 350px;
  animation: fadeInUp 1s ease;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

label { font-weight: 600; color: #21242a; font-size: 1rem; }

input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
}

button {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background-color: #21242a;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #13151e;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.back-link { color: white; text-decoration: none; font-size: 1rem; }

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px);}
  to { opacity: 1; transform: translateY(0);}
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
</style>
