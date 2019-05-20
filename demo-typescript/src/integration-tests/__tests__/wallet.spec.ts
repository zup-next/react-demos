import nock from 'nock'
import { url } from '../../api'
import { testResource } from '../utils'

describe('Resource tests: wallet', () => {

  const loadPayload = { balance: 500.97, cards: [] }
  const errorPayload = { message: 'error-message' }

  testResource({
    resourceName: 'wallet',
    mocks: {
      load: {
        success: () => nock(url).get('/wallet').reply(200, loadPayload),
        error: () => nock(url).get('/wallet').reply(500, errorPayload),
      },
    },
    loadPayload,
    errorPayload,
  })
})
