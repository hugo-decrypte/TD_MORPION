<template>
  <div class="container">
    <h1>Mon profil</h1>

    <form @submit.prevent="saveProfile" v-if="user" class="form">
      <div class="form-group">
        <label>Nom</label>
        <input type="text" v-model="user.name" />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="user.email" />
      </div>

      <div v-if="errors.length" class="errors">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>

      <button type="submit">Enregistrer</button>
    </form>

    <router-link to="/home" class="back-link">← Retour à l'accueil</router-link>
  </div>
</template>

<style scoped>

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #21242a;
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
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #0f1115;
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
  background-color: #0e1013;
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

.back-link:hover {
  opacity: 0.8;
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
