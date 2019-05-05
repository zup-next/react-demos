import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.response.use(response => response.data)

const loadProfile = () => api.get('/profile')

const saveProfile = data => api.put('/profile', data)

const loadWallet = () => api.get('/wallet')

const loadCatalog = () => api.get('/catalog')

const createOrder = data => api.post('/order', data)

export default {
  loadProfile,
  saveProfile,
  loadWallet,
  loadCatalog,
  createOrder,
}
