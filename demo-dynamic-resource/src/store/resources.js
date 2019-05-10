import { createResource, createDynamicResource } from '@zup-it/redux-resource'
import api from '../api'

const catalog = createResource('CATALOG', { load: api.loadCatalog })

const movies = createDynamicResource('MOVIES', { load: api.loadMovie })

export default {
  catalog,
  movies,
}
