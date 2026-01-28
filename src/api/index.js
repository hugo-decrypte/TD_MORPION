import axios from 'axios'

const api = axios.create({
  baseURL: 'https://morpion-api.edu.netlor.fr',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'key=6i.;Kz>[<kd-'
  }
})

export default api
