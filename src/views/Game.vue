<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      partie: null,
      ownerName: "...",
      opponentName: "En attente...",
      code: null,
      nextPlayer: null,
      socket: null,
      currentUserId: null
    }
  },

  methods: {

    //connection sur un websocket ( les 2 joueurus)
    connectToWebSocket() {
      if (!this.partie) return;

      this.socket = new WebSocket('wss://morpion-api.edu.netlor.fr/websockets');

      this.socket.onopen = () => {
        const message = {
          action: 'connect',
          game_id: this.partie.id,
          player_id: this.currentUserId
        };

        this.socket.send(JSON.stringify(message));
        console.log("Connecté au WebSocket !");
      };

      // on reçoit le message du websocket
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message WebSocket reçu:", data);

        // On recharge les données de la partie en conséquence
        this.loadGameData();

        //maintenant faut mettre a jour l'interface en fonction du type de message recu + modifié le jeu morpion en fonction du play
        switch (data.type || data.action) {
          case "opponent-join":
            console.log("L'adversaire a rejoint");
            break;
          case "opponent-play":
            console.log("L'adversaire a joué");
            break;
          case "opponent-quit":
            console.log("L'adversaire a quitté");
            this.opponentName = "En attente...";
            break;
        }
      };

      this.socket.onerror = (error) => {
        console.error("Erreur WebSocket:", error);
      };

      this.socket.onclose = () => {
        console.log("WebSocket fermé");
      };
    },

    loadGameData() {
      api.get(`/api/games/${this.partie.id}`)
        .then(response => {
          this.partie = response.data;
          this.updateGameInfo();
        })
    },

    updateGameInfo() {
      if (!this.partie) return;

      this.ownerName = this.partie.owner?.name || "Joueur 1";
      this.opponentName = this.partie.opponent?.name || "En attente...";
      this.code = this.partie.code;
      this.nextPlayer = this.partie.next_player;
    }
  },

  // On charge les données de la partie avant d'entrer dans la route
  beforeRouteEnter(to, from, next) {
    const gameId = to.params.id;

    api.get(`/api/games/${gameId}`)
      .then(response => {
        next(vm => {
          vm.partie = response.data;
          vm.updateGameInfo();
          vm.connectToWebSocket();
        });
      })
  },

  // ferme la connexion websocket en quittant la route
  beforeRouteLeave(to, from, next) {
    if (this.socket) {
      this.socket.close();
    }
    next();
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
