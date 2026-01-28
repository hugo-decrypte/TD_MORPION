import axios from 'axios'

const api = axios.create({
  baseURL: 'https://morpion-api.edu.netlor.fr',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'key=PDfMqvo#LKF%'
  }
})

export default api
