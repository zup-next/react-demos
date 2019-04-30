import Hapi from 'hapi'
import routes from './routes'
import { forEach } from 'lodash'

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  })

  forEach(routes, route => server.route({ ...route, options: { cors: true } }))

  await server.start()
  console.log('Server running on %ss', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
