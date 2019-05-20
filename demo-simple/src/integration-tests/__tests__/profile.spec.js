import nock from 'nock'
import { url } from '../../api'
import { testResource } from '../utils'

describe('Resource tests: profile', () => {

  const loadPayload = { name: 'John', lastname: 'Snow', email: 'johnsnow@song.ice.fire' }
  const errorPayload = { message: 'error-message' }

  testResource({
    resourceName: 'profile',
    mocks: {
      load: {
        success: () => nock(url).get('/profile').reply(200, loadPayload),
        error: () => nock(url).get('/profile').reply(500, errorPayload),
      },
      update: {
        success: () => nock(url).put('/profile').reply(200),
        error: () => nock(url).put('/profile').reply(500, errorPayload),
      },
    },
    loadPayload,
    errorPayload,
  })
})
