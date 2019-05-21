import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import resources from './resources'
import cacheManager from './cache'
import { createEffects, getTypeToSagaMap } from '@zup-it/redux-resource'
import { mapValues } from 'lodash'

const reducers = combineReducers(mapValues(resources, 'reducer'))

export const rootSaga = function* run() {
  yield createEffects(getTypeToSagaMap(mapValues(resources, 'sagas')))
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(cacheManager.getMiddleware(), sagaMiddleware),
)

sagaMiddleware.run(rootSaga)

export default store
