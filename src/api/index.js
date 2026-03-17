import axios from 'axios'

const api = axios.create({
  baseURL: 'https://morpion-api.edu.netlor.fr',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `key=${import.meta.env.VITE_API_KEY}`
  }
})
console.log("Clé chargée :", import.meta.env.VITE_API_KEY);
export default api
