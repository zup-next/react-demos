import { getProfile, updateProfile, getWallet, updateWallet, getCatalog } from './model'
import { find } from 'lodash'
import Joi from '@hapi/joi'

const loadProfile = {
  method: 'GET',
  path: '/profile',
  handler: getProfile,
}

const saveProfile = {
  method: 'PUT',
  path: '/profile',
  handler: (request, h) => {
    updateProfile(request.payload)

    return h.response(getProfile())
  },
  options: {
    validate: {
      payload: {
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
      },
    },
  },
}

const loadWallet = {
  method: 'GET',
  path: '/wallet',
  handler: getWallet,
}

const loadCatalog = {
  method: 'GET',
  path: '/catalog',
  handler: getCatalog,
}

const order = {
  method: 'POST',
  path: '/order',
  handler: (request, h) => {
    const { productId, payment } = request.payload
    const product = find(getCatalog(), { id: productId })
    const { cards, balance } = getWallet()
    if (payment.type === 'balance' && balance >= product.price) {
      updateWallet({ balance: balance - product.price })
    }

    if (payment.type === 'card' && !find(cards, { id: payment.id })) {
      return h.response({ status: 'error: invalid payment method' }).status(422)
    }

    return h.response({ status: 'processed' })
  },
}

export default [
  loadProfile,
  saveProfile,
  loadWallet,
  loadCatalog,
  order,
]
