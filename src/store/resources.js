import createResource from '@zup-it/redux-resource'
import api from '../api'

const profile = createResource('PROFILE', {
  load: api.loadProfile,
  update: api.saveProfile,
})

const catalog = createResource('CATALOG', { load: api.loadCatalog })

const order = createResource('ORDER', { create: api.createOrder })

const wallet = createResource('WALLET', { load: api.loadWallet })

export default {
  profile,
  catalog,
  order,
  wallet,
}
