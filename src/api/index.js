import axios from "axios";

export default axios.create({
  baseURL: 'https://morpion-api.edu.netlor.fr/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'ma_super_api_key'
  }
});
