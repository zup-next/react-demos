import { createResource } from '@zup-next/redux-resource'
import { put } from 'redux-saga/effects'
import api from '../api'

const profile = createResource('PROFILE', {
  load: api.loadProfile,
  update: api.saveProfile,
})

const catalog = createResource('CATALOG', { load: api.loadCatalog })

const wallet = createResource('WALLET', { load: api.loadWallet })

function* onOrderSuccess() {
  yield put(wallet.actions.load())
}

const order = createResource('ORDER', { create: api.createOrder }, { create: onOrderSuccess })

export default {
  profile,
  catalog,
  order,
  wallet,
}
