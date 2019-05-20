import nock from 'nock'
import { url } from '../../api'
import { testResource } from '../utils'

describe('Resource tests: catalog', () => {

  const loadPayload = [{ id: '0', title: 'Lord of the Rings' }, { id: '1', title: 'Avatar' }]
  const errorPayload = { message: 'error-message' }

  testResource({
    resourceName: 'catalog',
    mocks: {
      load: {
        success: () => nock(url).get('/catalog').reply(200, loadPayload),
        error: () => nock(url).get('/catalog').reply(500, errorPayload),
      },
    },
    loadPayload,
    errorPayload,
  })
})
