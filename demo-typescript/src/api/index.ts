import axios, { AxiosPromise } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.response.use(response => response.data)

const loadProfile = (): AxiosPromise<Profile> => api.get('/profile')

const saveProfile = (data: Profile): AxiosPromise<Profile> => api.put('/profile', data)

const loadWallet = (): AxiosPromise<Wallet> => api.get('/wallet')

const loadCatalog = (): AxiosPromise<Catalog> => api.get('/catalog')

const createOrder = (data: Order): AxiosPromise<void> => api.post('/order', data)

export default {
  loadProfile,
  saveProfile,
  loadWallet,
  loadCatalog,
  createOrder,
}
