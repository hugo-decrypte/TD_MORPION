<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      partie: null,
      ownerName: "...waiting",
      opponentName: "...waiting",
      code: null,
      nextPlayer: null
    }
  },

  methods: {
    waitForOpponentMove() {
      console.log(this.partie)
      this.socket = new WebSocket('https://morpion-api.edu.netlor.fr/websockets');
      this.ownerName = this.partie.owner.name
      this.code = this.partie.code

      this.socket.onopen = () => {
        const message = {
          action: 'connect',
          game_id: this.partie.id,
          player_id: this.partie.owner_id
        };

        this.socket.send(JSON.stringify(message));
        console.log("Connecté au WebSocket, message envoyé !");
      };
      api.get(`/api/games/${this.partie.id}`).then(response => {
        this.partie = response.data

        this.socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data)
          switch (data) {
            case "opponent-join":
              console.log("Albert vient de rejoindre")
              this.opponentName = this.partie.opponent.name
              this.nextPlayer = this.partie.next_player
              break
            case "opponent-play":
              this.nextPlayer = this.partie.next_player
              console.log("Albert a joué")
              break
            case "opponent-quit":
              console.log("Albert a ff la game")
              this.opponentName = "...waiting"
              break
          }
        }
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    const gameId = to.params['id']
    api.get(`/api/games/${gameId}`)
      .then(response => {
        next(vm => {
          vm.partie = response.data
          vm.waitForOpponentMove()
        })
      })
  }
}
</script>

<template>
  <h1>Game</h1>
  <h2>Joueur 1 : {{ownerName}}</h2>
  <h2>Joueur 2 : {{opponentName}}</h2>
  <h2>Code : #{{code}}</h2>
  <router-link to="/home">Quitter la partie</router-link>
  <p v-if="opponentName === '...waiting'">En attente d'un adversaire...</p>
  <p v-if="nextPlayer !== null">C'est à {{nextPlayer.name}} de jouer</p>
</template>

<style scoped>

</style>
