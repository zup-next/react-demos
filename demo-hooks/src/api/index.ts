import axios, { AxiosPromise, AxiosError, AxiosResponse } from 'axios'
import ApiError from './ApiError'
import { Profile, Wallet, Catalog, Order } from '../types'

export const url = 'http://localhost:3000'

const api = axios.create({
  baseURL: url,
})

const onResponseSuccess = (response: AxiosResponse) => response.data

const onResponseError = (error: AxiosError) => {
  if (error && error.response) throw new ApiError(error.response.status, error.response.data)
  throw error
}

api.interceptors.response.use(onResponseSuccess, onResponseError)

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
