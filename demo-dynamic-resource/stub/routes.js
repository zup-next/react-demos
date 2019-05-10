import { getCatalog, getMovie } from './model'

const loadCatalog = {
  method: 'GET',
  path: '/catalog',
  handler: getCatalog,
}

const loadMovie = {
  method: 'GET',
  path: '/movie/{id}',
  handler: (req, reply) => {
    const { id } = req.params
    if (id === '1' || id === '4') return reply.response().code(500)

    return getMovie(req.params.id)
  },
}

export default [
  loadCatalog,
  loadMovie,
]
