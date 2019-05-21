import SagaTester from 'redux-saga-tester'
import { mapValues } from 'lodash'
import { Status, createResourceInitialState } from '@zup-next/redux-resource'
import nock from 'nock'
import { rootSaga } from '../../store'
import resources from '../../store/resources'
import { url } from '../../api'
import ApiError from '../../api/ApiError'

const { catalog } = resources

describe('Resource tests: catalog', () => {
  it('should load catalog successfully', async () => {
    const sagaTester = new SagaTester({
      reducers: mapValues(resources, 'reducer'),
    })

    const payload = [{ id: '1', title: 'Lord of the Rings' }, { id: '2', title: 'Avatar' }]
    nock(url).get('/catalog').reply(200, payload)

    sagaTester.start(rootSaga)
    sagaTester.dispatch(catalog.actions.load())

    await sagaTester.waitFor(catalog.types.LOAD_SUCCESS)
    expect(sagaTester.getState().catalog).toStrictEqual({
      ...createResourceInitialState(),
      data: payload,
      load: { status: Status.success, error: null },
    })
  })

  it('should yield error while loading catalog', async () => {
    const sagaTester = new SagaTester({
      reducers: mapValues(resources, 'reducer'),
    })

    const errorPayload = { message: 'error-message' }
    nock(url).get('/catalog').reply(500, errorPayload)

    sagaTester.start(rootSaga)
    sagaTester.dispatch(catalog.actions.load())

    await sagaTester.waitFor(catalog.types.LOAD_ERROR)
    expect(sagaTester.getState().catalog).toStrictEqual({
      ...createResourceInitialState(),
      load: { status: Status.error, error: new ApiError(500, errorPayload) },
    })
  })
})
