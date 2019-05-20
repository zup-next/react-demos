import axios from 'axios'
import ApiError from './ApiError'

export const url = 'http://localhost:3000'

const api = axios.create({
  baseURL: url,
})

const onResponseSuccess = response => response.data

const onResponseError = (error) => {
  if (error && error.response) {
    throw new ApiError(error.response.status, error.response.data)
  }
  throw new Error(error)
}

api.interceptors.response.use(onResponseSuccess, onResponseError)

const loadCatalog = () => api.get('/catalog')

const loadMovie = id => api.get(`/movie/${id}`)

export default {
  loadCatalog,
  loadMovie,
}
