
import SagaTester from 'redux-saga-tester'
import { mapValues } from 'lodash'
import { Status, createResourceInitialState } from '@zup-it/redux-resource'
import nock from 'nock'
import { rootSaga } from '../../store'
import resources from '../../store/resources'
import { url } from '../../api'
import { testResource } from '../utils'

const { order, wallet } = resources

describe('Resource tests: order', () => {

  const errorPayload = { message: 'error-message' }

  testResource({
    resourceName: 'order',
    mocks: {
      create: {
        success: () => nock(url).post('/order').reply(200),
        error: () => nock(url).post('/order').reply(500, errorPayload),
      },
    },
    errorPayload,
  })

  it('should reload wallet after a successful order', async () => {
    const sagaTester = new SagaTester({
      reducers: mapValues(resources, 'reducer'),
    })

    const walletPayload = { balance: 500.97, cards: [] }
    nock(url).post('/order').reply(200)
    nock(url).get('/wallet').reply(200, walletPayload)

    sagaTester.start(rootSaga)
    sagaTester.dispatch(order.actions.create())

    await sagaTester.waitFor(wallet.types.LOAD_SUCCESS)
    expect(sagaTester.getState().wallet).toStrictEqual({
      ...createResourceInitialState(),
      data: walletPayload,
      load: { status: Status.success, error: null },
    })
  })
})
