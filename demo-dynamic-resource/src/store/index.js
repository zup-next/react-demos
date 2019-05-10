import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import resources from './resources'
import { createEffects } from '@zup-it/redux-resource'

const reducers = combineReducers({
  catalog: resources.catalog.reducers,
  movies: resources.movies.reducers,
})

const sagas = function* run() {
  yield createEffects({
    ...resources.catalog.sagas,
    ...resources.movies.sagas,
  })
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(sagas)

export default store
