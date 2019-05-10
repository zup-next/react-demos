import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.response.use(response => response.data)

const loadCatalog = () => api.get('/catalog')

const loadMovie = id => api.get(`/movie/${id}`)

export default {
  loadCatalog,
  loadMovie,
}
