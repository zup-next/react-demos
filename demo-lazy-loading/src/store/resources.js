import createResource from '@zup-it/redux-resource'
import { put } from 'redux-saga/effects'
import api from '../api'

const catalog = createResource('CATALOG', { load: api.loadCatalog })

const catalog = createResource('MOVIES', { load: api.loadMovie })

export default {
  movies,
  catalog,
}
