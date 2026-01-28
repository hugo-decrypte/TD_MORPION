<script>
import api from '../api/index.js'


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
          console.log(this.gameId)
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
  <div class="container">
    <h1>Accueil</h1>

    <div class="boutons">
      <router-link to="profile"> Mon profil </router-link>
      <button v-on:click="createGame()">Nouvelle partie</button>
      <router-link to="join"> Rejoindre une partie </router-link>
    </div>
  </div>
</template>

<style scoped>

.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #21242a;
  gap: 2rem;
}

h1 {
  font-size: 3rem;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 0.8s ease;
}

.boutons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeInUp 1s ease;
}

/* Style commun pour les boutons et les router-links */
button,
router-link,
.boutons a {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #21242a;
  background: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  min-width: 250px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
}

button:hover,
.boutons a:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: #f8f9ff;
}

button:active,
.boutons a:active {
  transform: translateY(-1px);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
