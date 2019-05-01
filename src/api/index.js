import axios from 'axios'

const api = axios.create({
  mode: 'cors',
  baseURL: 'http://localhost:3000',
})

api.interceptors.response.use(response => response.data)

const loadProfile = () => api.request('/profile', { method: 'GET' })

const saveProfile = data => api.request('/profile', { method: 'PUT', data })

const loadWallet = () => api.request('/wallet', { method: 'GET' })

const loadCatalog = () => api.request('/catalog', { method: 'GET' })

const createOrder = data => api.request('/order', { method: 'POST', data })

export default {
  loadProfile,
  saveProfile,
  loadWallet,
  loadCatalog,
  createOrder,
}
