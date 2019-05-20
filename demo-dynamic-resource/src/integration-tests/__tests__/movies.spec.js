
import SagaTester from 'redux-saga-tester'
import { mapValues } from 'lodash'
import { Status, createResourceInitialState } from '@zup-it/redux-resource'
import nock from 'nock'
import { rootSaga } from '../../store'
import resources from '../../store/resources'
import { url } from '../../api'
import ApiError from '../../api/ApiError'

const { movies } = resources

describe('Resource tests: movies', () => {
  it('should load movie successfully', async () => {
    const sagaTester = new SagaTester({
      reducers: mapValues(resources, 'reducer'),
    })

    const payload = { id: '1', title: 'Lord of the Rings', poster: 'https://img.example.com/1.jpeg' }
    nock(url).get('/movie/1').reply(200, payload)

    sagaTester.start(rootSaga)
    sagaTester.dispatch(movies.actions.load('1'))

    await sagaTester.waitFor(movies.types.LOAD_SUCCESS)
    expect(sagaTester.getState().movies).toStrictEqual({
      1: {
        ...createResourceInitialState(),
        data: payload,
        load: { status: Status.success, error: null },
      },
    })
  })

  it('should yield error while loading a movie', async () => {
    const sagaTester = new SagaTester({
      reducers: mapValues(resources, 'reducer'),
    })

    const errorPayload = { message: 'error-message' }
    nock(url).get('/movie/1').reply(500, errorPayload)

    sagaTester.start(rootSaga)
    sagaTester.dispatch(movies.actions.load('1'))

    await sagaTester.waitFor(movies.types.LOAD_ERROR)
    expect(sagaTester.getState().movies).toStrictEqual({
      1: {
        ...createResourceInitialState(),
        load: { status: Status.error, error: new ApiError(500, errorPayload) },
      },
    })
  })
})
