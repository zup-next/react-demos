import { getProfile, updateProfile, getWallet, updateWallet, getCatalog } from './model'
import { find } from 'lodash'
import Joi from '@hapi/joi'

const loadCatalog = {
  method: 'GET',
  path: '/catalog',
  handler: getCatalog,
}

const loadMovie = {
  method: 'GET',
  path: '/movie/{id}',
  handler: req => getMovie(req.params.id),
}

export default [
  loadCatalog,
  loadMovie,
]
