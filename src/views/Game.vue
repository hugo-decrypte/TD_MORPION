<template>
  <div class="container" v-if="partie">
    <div class="header-nav">
      <h1>Morpion #{{ partie.code }}</h1>
    </div>

    <div class="scoreboard fadeInUp">
      <div class="player-card" :class="{ active: partie.next_player_id === partie.owner_id }">
        <span class="symbol">X</span>
        <span class="name">{{ partie.owner.name }}</span>
        <small v-if="currentUserId === partie.owner_id" class="me-tag">MOI</small>
      </div>

      <div class="player-card" :class="{ active: partie.next_player_id === partie.opponent_id }">
        <span class="symbol">O</span>
        <span class="name">{{ partie.opponent?.name || 'En attente...' }}</span>
        <small v-if="currentUserId === partie.opponent_id" class="me-tag">MOI</small>
      </div>
    </div>

    <div v-if="partie.state === 2" class="end-card fadeInUp">
      <h2>Partie terminée</h2>
      <p>{{ winnerName }} a gagné !</p>
      <button @click="$router.push('/home')">Retour Accueil</button>
    </div>

    <div v-else-if="partie.opponent" class="game-content fadeInUp">
      <div class="board">
        <div v-for="r in 3" :key="r" class="grid-row">
          <div v-for="c in 3" :key="c" class="cell" @click="play(r, c)">
            {{ getCellValue(r, c) }}
          </div>
        </div>
      </div>
      <p v-if="isMyTurn" class="turn-alert">C'est ton tour !</p>
    </div>

    <div v-else class="waiting fadeInUp">
      <p>Partage le code pour jouer !</p>
    </div>

    <router-link to="/home" class="back-link">← Quitter la partie</router-link>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      partie: null,
      currentUserId: null,
      socket: null,
    }
  },
  computed: {
    isMyTurn() {
      return this.partie?.next_player_id === this.currentUserId;
    },
    winnerName() {
      if (!this.partie?.winner_id) return "Match nul";
      return this.partie.winner_id === this.partie.owner_id ? this.partie.owner.name : this.partie.opponent.name;
    }
  },
  methods: {
    getCellValue(r, c) {
      const val = this.partie[`r${r}c${c}`];
      return val === 1 ? "X" : (val === 2 ? "O" : "");
    },
    async play(r, c) {
      if (!this.isMyTurn || this.partie[`r${r}c${c}`] || this.partie.state === 2) return;
      try {
        const res = await api.patch(`/api/games/${this.partie.id}/play/${r}/${c}`);
        this.partie = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    loadGameData() {
      api.get(`/api/games/${this.partie.id}`).then(res => {
        this.partie = res.data;
      });
    },
    connectToWebSocket() {
      this.socket = new WebSocket('wss://morpion-api.edu.netlor.fr/websockets');
      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({
          action: 'connect',
          game_id: this.partie.id,
          player_id: this.currentUserId
        }));
      };
      this.socket.onmessage = () => this.loadGameData();
    }
  },
  beforeRouteEnter(to, from, next) {
    const id = to.params.id;
    Promise.all([api.get('/api/profile'), api.get(`/api/games/${id}`)]).then(([u, g]) => {
      next(vm => {
        vm.currentUserId = u.data.id;
        vm.partie = g.data;
        vm.connectToWebSocket();
      });
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.socket) this.socket.close();
    next();
  }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #21242a;
  gap: 1.5rem;
  padding: 1rem;
}

h1 {
  font-size: 2.5rem;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInDown 0.8s ease;
}

/* SCOREBOARD */
.scoreboard {
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.player-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 15px;
  color: white;
  text-align: center;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.player-card.active {
  border-color: white;
  background: rgba(255, 255, 255, 0.2);
}

.symbol {
  font-size: 1.5rem;
  font-weight: bold;
}

.me-tag {
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 4px;
}

.board {
  background: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.grid-row {
  display: flex;
}

.cell {
  width: 80px;
  height: 80px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #21242a;
  cursor: pointer;
}

button {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #21242a;
  background: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 1rem;
}

.back-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 1rem;
}

.turn-alert {
  color: white;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}

.fadeInUp {
  animation: fadeInUp 1s ease;
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
