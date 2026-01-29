<template>
  <div class="container">
    <h1>Rejoindre une partie</h1>

    <form @submit.prevent="joinGame" class="form">
      <div class="form-group">
        <label for="code">Code de la partie</label>
        <input type="text" id="code" v-model="gameCode" placeholder="Entrez le code de la partie" required/>
      </div>

      <!-- gestion erreurs -->
      <div v-if="errors.length" class="errors">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>

      <button type="submit">Rejoindre</button>
    </form>

    <router-link to="/home" class="back-link">← Retour à l'accueil</router-link>
  </div>
</template>

<script>
import api from '../api/index.js'

export default {
  data() {
    return {
      gameCode: '',
      errors: []
    }
  },

  methods: {
    joinGame() {
      this.errors = []

      api.post(`/api/games/${this.gameCode}/join`)
        .then((response) => {
          const gameId = response.data.id
          this.$router.push({ name: 'game', params: { id: gameId } })
        })
        .catch(error => {
          if (error.response && error.response.data.errors) {
            this.errors = error.response.data.errors
          } else if (error.response && error.response.status === 404) {
            this.errors = ['Code de partie invalide']
          } else {
            this.errors = ['Une erreur est survenue']
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

label {
  font-weight: 600;
  color: #21242a;
  font-size: 1rem;
}

input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
}

.errors {
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.errors ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #c00;
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

button:active {
  transform: translateY(0);
}

.back-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: opacity 0.3s ease;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px);}
  to { opacity: 1; transform: translateY(0);}
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}

</style>
