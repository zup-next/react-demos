import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import resources from './resources'
import { createEffects } from '@zup-it/redux-resource'

const reducers = combineReducers({
  catalog: resources.catalog.reducer,
  order: resources.order.reducer,
  profile: resources.profile.reducer,
  wallet: resources.wallet.reducer,
})

const sagas = function* run() {
  yield createEffects({
    ...resources.catalog.sagas,
    ...resources.order.sagas,
    ...resources.profile.sagas,
    ...resources.wallet.sagas,
  })
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(sagas)

export default store
