# Request management made easy with @zup-it/redux-resource

We, at Zup IT, usually use a set of utilities when dealing with request management in react. We
recently decided to share them with the community through two different repositories:
redux-resources and redux-action-cache. In this article we're going to talk about the first one, which
is responsible for creating almost everything we need to control our requests through the redux
actions and state.

Let's face it, creating action objects, action creators, reducers and sagas for every request is
boring. It takes time and sometimes it gets hard to maintain. If we are using REST services though,
it's pretty straightforward, most of the api has already been exposed as resources, every GET,
PUT, POST and DELETE is pretty much the same thing. Why are we recreating the code, which is
basically the same, every time we need to call a new service? What if we also treat our requests as
REST resources in the front end, can't we then use the same treatment for every request and avoid
code repetition? This is exactly what our redux-resource library intends to do!

This article presents a simple application created with @zup-it/redux-resource. The application
is an online movie store which allows the user to check their current balance, see a catalog of
movies and place orders. The focus here will be on how to make the requests, so we won't talk much
about styles or other react components.

The demo project can be found in todo:demo-project. You can follow the instructions in the readme of
the repository to get it running. The following images illustrates how the application works:

todo:images

In the first screen, the user checks his/her balance and the catalog of movies available for
purchasing. The second screen show the details of the movie choses, while the third screen is
responsible for actually placing an order. We'll first use the first and second screen as an example
of the basic usage of the library. The third screen (placing an order) is a bit more complex and
we'll discuss it in more details.

The REST api we're using offers the following services:

- GET /profile: returns the user profile
- PUT /profile: updates the profile with the object passed in the payload
- GET /catalog: get the list of movies available
- GET /wallet: get an object with two properties: balance and cards. "Balance" is a number
representing the user's balance and "cards" is a list of credit cards.
- POST /wallet: adds a new credit card to the wallet
- DELETE /wallet: removes a credit card from the wallet
- POST /order: creates an order

Attention: although http requests can be GET, POST, PUT or DELETE, the operations defined in
@zup-it/redux-resource are load, create, update and remove.

In the first and second screens, we can identify three resources: the user profile, the balance and
the movie catalog. The first thing we must do is to create the api functions. We recommend using
axios (todo:link) for this.

api/index.js
```javascript
import axios from 'axios'

const api = axios.create({
  mode: 'cors',
  baseURL: 'http://localhost:3000',
})

// if we don't write the next line, our resources will receive the entire response in the data field. We don't want that.
api.interceptors.response.use(response => response.data)

const loadProfile = () => api.get('/profile')

const saveProfile = data => api.put('/profile', data)

const loadWallet = () => api.get('/wallet')

const createCardForWallet = data => api.post('/wallet', data)

const removeCardFromWallet = id => api.delete('/wallet', { id })

const createOrder = data => api.post('/order', data)

export default {
  loadProfile,
  saveProfile,
  loadWallet,
  loadCatalog,
  createOrder,
}
```

Now that we can connect to the api, we can create the actions, reducers and sagas for redux:

store/resources.js
```javascript
import createResource from '@zup-next/redux-resource'
import api from '../api'

const profile = createResource('PROFILE', {
  load: api.loadProfile,
  update: api.saveProfile,
})

const catalog = createResource('CATALOG', {
  load: api.loadCatalog,
  create: api.createCardForWallet,
  remove: api.removeCardFromWallet
})

const wallet = createResource('WALLET', { load: api.loadWallet })

const order = createResource('ORDER', { create: api.createOrder })

export default {
  profile,
  catalog,
  order,
  wallet,
}
```

It's as simple as that! Every resource can have a load, update, create or delete operation. In this
example we used the operations update profile, create wallet and delete wallet just to illustrate
how they might be used in our simple demo application, we won't really be using them.

The function `createResource` returns an object with the keys types, actions, reducers and sagas.
We use the return value of `createResource` to create our store and dispatch actions. The following
code shows how to create the redux store.

store/index.js
```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import resources from './resources'
import { createEffects } from '@zup-next/redux-resource'

const reducers = combineReducers({
  catalog: resources.catalog.reducers,
  order: resources.order.reducers,
  profile: resources.profile.reducers,
  wallet: resources.wallet.reducers,
})

const sagas = function* run() {
  yield createEffects({
    ...resources.catalog.sagas,
    ...resources.order.sagas,
    ...resources.profile.sagas,
    ...resources.wallet.sagas,
  })
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(sagas)

export default store
```

In the code above, in order to make the code more clear, we decided to specify every key in the 
parameters passed to the functions `combineReducers` and `createEffects`. You could have used
functions like `map` and `reduce` from lodash (todo: link) to simplify the code. `combineReducers`
is a typical function from redux, while `createEffects` is an utility function from our library, it
takes a map from action type to generator function and creates all saga effects. For more details
on this function, please, refer to our documentation (todo: link).

Now that we have configured the store and the resources, we can start using them! We divided the
first and second screen into three containers:

- Header: responsible for the header, shared by both screens
- Home: responsible for the content of the first screen
- Movie: responsible for the content of the second screen

Below, we present the code for the Header container:

containers/header/index.js
```javascript
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { HeaderBar, HeaderContent, Top, Bottom } from './styled'
import { isPristine, isLoading, hasLoadError } from '@zup-next/redux-resource'

class Header extends PureComponent {

  componentDidMount() {
    const { loadProfile, loadWallet } = this.props
    loadProfile()
    loadWallet()
  }

  renderLoading = () => <HeaderBar><HeaderContent>Loading...</HeaderContent></HeaderBar>

  renderError = () => <HeaderBar><HeaderContent>Error!</HeaderContent></HeaderBar>

  renderContent = (profile, balance) => (
    <HeaderBar>
      <HeaderContent>
        <Top>{profile.name} {profile.lastname}</Top>
        <Bottom>{profile.email}</Bottom>
      </HeaderContent>
      <HeaderContent>
        <Top>Saldo disponível:</Top>
        <Bottom>${balance}</Bottom>
      </HeaderContent>
    </HeaderBar>
  )

  render() {
    const { profile, wallet } = this.props

    if (isPristine(profile) || isPristine(wallet)) return null
    if (isLoading(profile) || isLoading(wallet)) return this.renderLoading()
    if (hasLoadError(profile) || hasLoadError(wallet)) return this.renderError()

    return this.renderContent(profile.data, wallet.data.balance)
  }

}

const mapStateToProps = ({ wallet, profile }) => ({ wallet, profile })
const actions = {
  loadWallet: resources.wallet.actions.load,
  loadProfile: resources.profile.actions.load,
}

export default connect(mapStateToProps, actions)(Header)
```

Inside the `componentDidMount` part of the react cycle, we dispatch the load operation for our
resources "profile" and "wallet". In the `render` function we check the status of our resources and,
based on them, we decide what to show. `isPristine`, `isLoading` and `hasLoadError` are helper
functions provided by our library (todo: link to docs), but if you don't like them, you could check the status directly:

```javascript
if (profile.load.status === 'pristine') || wallet.load.status === 'pristine') return null
if (profile.load.status === 'pending') || wallet.load.status === 'pending') return this.renderLoading()
if (profile.load.status === 'error') || wallet.load.status === 'error') return this.renderError()
```

We have four possible states for any resource operation, they are: "pristine", "pending", "success"
and "error". We first check for "pristine" because one render is done before `componentDidMount` is
called and we don't want to render anything before dispatching the actions to load our resources.

The response for our requests will be returned in the field "data" of our resources. When defining
our api (first code presented in this article), we told axios to return only the payload as the
response, so, in our case, "data" will always contain the payload of the responses returned by the
server.

You can use the same idea to build all other containers. Below we show the code for the Home
container.

containers/home/index.js
```javascript
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-next/redux-resource'
import Movie from './Movie'
import { List } from './styled'
import { Content, PageTitle, Center } from '../../components/commons.styled'
import { map } from 'lodash'

class Home extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  renderLoading = () => <Content>Loading...</Content>

  renderError = () => <Content>Error!</Content>

  renderContent = movies => (
    <Content>
      <Center><PageTitle>Catalog</PageTitle></Center>
      <List>
        {map(movies, movie => <Movie key={movie.id} {...movie} />)}
      </List>
    </Content>
  )

  render() {
    const { catalog } = this.props

    if (isPristine(catalog)) return null
    if (isLoading(catalog)) return this.renderLoading()
    if (hasLoadError(catalog)) return this.renderError()

    return this.renderContent(catalog.data)
  }

}

const mapStateToProps = ({ catalog }) => ({ catalog })
const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
```

And the movie container:

containers/movie/index.js
```javascript
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { isPristine, isLoading, hasLoadError } from '@zup-next/redux-resource'
import { find } from 'lodash'
import { Link } from 'react-router-dom'
import { Poster, MovieData, Description } from './styled'
import { Content, PageTitle, Button } from '../../components/commons.styled'

class Home extends PureComponent {

  componentDidMount() {
    const { loadCatalog } = this.props
    loadCatalog()
  }

  renderLoading = () => <Content>Loading...</Content>

  renderError = () => <Content>Error!</Content>

  renderContent = movie => (
    <Content>
      <Poster src={movie.poster} />
      <MovieData>
        <PageTitle>{movie.title} ({movie.year})</PageTitle>
        <Description>{movie.description}</Description>
        <Link to={`/payment/${movie.id}`}>
          <Button>Buy for ${movie.price}</Button>
        </Link>
      </MovieData>
    </Content>
  )

  render() {
    const { movie } = this.props

    if (isPristine(movie)) return null
    if (isLoading(movie)) return this.renderLoading()
    if (hasLoadError(movie)) return this.renderError()

    return this.renderContent(movie.data)
  }

}

const mapStateToProps = ({ catalog }, { match: { params: { id } } }) => ({
  movie: { ...catalog, data: find(catalog.data, { id: parseInt(id) }) },
})

const actions = { loadCatalog: resources.catalog.actions.load }

export default connect(mapStateToProps, actions)(Home)
```

The only difference in the movie container is that we process the redux state before passing it
to the react component. Here we are not interested in the entire catalog, but only in the movie with
id equal to the url parameter. So we replace the parameter data of the catalog with the movie we
want.

Great! We already made three of our containers with three different request and we didn't write a
single piece of reducer or saga! It might not look so great in this simple application, but it saves
a lot of time and code in real world apps! Furthermore, we have a very well defined pattern of how
to write our interactions with an api, it helps a great deal in maintenance!

So... what about that third screen? It's a little bit more complex, so we left it for last. In
the third container (Payment) we need to load the catalog and create an order. To start, we can use
the same strategy as before to write the code:

containers/Payment/index.js
```javascript
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import resources from '../../store/resources'
import { find, map } from 'lodash'
import { Content, Product, Detail, PaymentMethodList } from './styled'
import { PageTitle, Button, Center } from '../../components/commons.styled'
import { Link } from 'react-router-dom'
import PaymentMethod from './PaymentMethod'
import {
  isPristine,
  isLoading,
  hasLoadError,
  isCreating,
  hasCreateSuccess,
  hasCreateError,
} from '@zup-next/redux-resource'

class Home extends PureComponent {

  state = { selectedPaymentMethod: { type: 'balance' } }

  componentDidMount() {
    const { loadCatalog, loadWallet } = this.props
    loadCatalog()
    loadWallet()
  }

  selectPaymentMethod = paymentMethod => this.setState({ selectedPaymentMethod: paymentMethod })

  placeOrder = () => {
    const { createOrder, movie } = this.props
    const { selectedPaymentMethod } = this.state

    createOrder({ productId: movie.data.id, payment: selectedPaymentMethod })
  }

  renderLoading = () => <Content>Loading...</Content>

  renderLoadError = () => <Content>Error!</Content>

  renderOrderProgress = () => <Content>Please, wait while we process your order...</Content>

  renderOrderError = resetOrderStatus => (
    <Content>
      <p>Sorry. We could not process your order. Please, try again later.</p>
    </Content>
  )

  renderOrderSuccess = balance => (
    <Content>
      <p>Congratulations! You have acquired a new Title!!!</p>
      <p>Expect to receive a download link in your inbox in the next few minutes.</p>
      <p>Thank you for buying with us. Your current balance is ${balance}</p>
      <p><Link to="/"><Button>Go back to catalog</Button></Link></p>
    </Content>
  )

  renderContent = (movie, wallet, selected) => (
    <Content>
      <PageTitle>Order Summary</PageTitle>
      <Product>Item: {movie.title}</Product>
      <Detail>Order total: ${movie.price}</Detail>
      <Detail>Choose a payment method:</Detail>
      <PaymentMethodList>
        <PaymentMethod
          label="Balance"
          value={`$${wallet.balance}`}
          selected={selected.type === 'balance'}
          onClick={() => this.selectPaymentMethod({ type: 'balance' })}
        />
        {map(wallet.cards, card => (
          <PaymentMethod
            key={card.id}
            label={card.brand}
            value={`**** **** **** ${card.number}`}
            selected={selected.id === card.id}
            onClick={() => this.selectPaymentMethod({ type: 'card', id: card.id })}
          />
        ))}
      </PaymentMethodList>
      <Center><Button onClick={this.placeOrder}>Place order</Button></Center>
    </Content>
  )

  render() {
    const { movie, wallet, order } = this.props
    const { selectedPaymentMethod } = this.state

    if (isPristine(movie) || isPristine(wallet)) return null
    if (isLoading(movie) || isLoading(wallet)) return this.renderLoading()
    if (hasLoadError(movie) || hasLoadError(wallet)) return this.renderLoadError()
    if (isCreating(order)) return this.renderOrderProgress()
    if (hasCreateError(order)) return this.renderOrderError()
    if (hasCreateSuccess(order)) return this.renderOrderSuccess(wallet.data.balance)

    return this.renderContent(movie.data, wallet.data, selectedPaymentMethod)
  }

}

const mapStateToProps = ({ catalog, wallet, order }, { match: { params: { id } } }) => ({
  movie: { ...catalog, data: find(catalog.data, { id: parseInt(id) }) },
  wallet,
  order,
})

const actions = {
  loadCatalog: resources.catalog.actions.load,
  loadWallet: resources.wallet.actions.load,
  createOrder: resources.order.actions.create,
}

export default connect(mapStateToProps, actions)(Home)
```

The important thing in the code above is the use of a new resource operation: create. Now we make
use of the helper functions `isCreating`, `hasCreateError` and `hasCreateSuccess` to verify the
status of the create operation. Also, we are now passing a parameter to our action creator: the
order we want to create.

If you execute the code now, almost everything will work perfectly, there are only two problems we
need to correct.

Problem number one: once we order something, `order.create.status`, in the redux state, will always
be either "success" or "error". If we go back to the home page and try to buy a movie again we won't
be able to, because when we reach the payment page, we'll be faced with a success or an error
message, depending on the outcome of the last order.

Fix: the fix for this problem is really simple, we need to reset the state for creating an order
before unmounting the component. To make it a better experience, we can also add a "try again"
button to the error message:

```javascript
...

class Home extends PureComponent {

  ...

  componentWillUnmount() {
    const { resetOrderStatus } = this.props
    resetOrderStatus()
  }

  ...

  renderOrderError = () => (
    <Content>
      <p>Sorry. We could not process your order. Please, try again later.</p>
      <Button onClick={this.props.resetOrderStatus}>Try again</Button>
    </Content>
  )

  ...

}

...

const actions = {
  ...
  resetOrderStatus: resources.order.actions.resetCreateStatus,
}

export default connect(mapStateToProps, actions)(Home)

```

You can find an extensive list of all action creators available in a resource by checking our
documentation (todo: link).

Now, if you try to other a new movie, it will work properly!

But, there's still another problem...

Second problem: if you payed attention to the success message of the order, you might have noticed
that there's something wrong. The text states "Thank you for buying with us. Your current balance is
`x`", the value of `x` has not been updated. If the order has been paid with balance, the movie's
price should've been discounted. Also, the value in the header also didn't update.

Fix: this behavior is expected, the order has been placed, but in no moment we said what to do next.
After placing an order we must update the value of balance. There are two ways we can achieve this:

1. Update the redux state, subtracting the movie's price from `wallet.balance`.
2. Reload the resource wallet.

We chose the second approach and to fix the problem, we'll state that after every successful order,
the wallet resource must be reloaded. This is pretty simple to do. When declaring our resources, we
can pass a third parameter, which are generator functions to run just after the operations succeed.
They must be generator functions, because they will be integrated as part of the saga. See in the
code below how we can change the definition of the resource "order" to implement this feature.

store/resources.js
```javascript
import { put } from 'redux-saga/effects'
...

function* onOrderSuccess() {
  yield put(wallet.actions.load())
}

const order = createResource('ORDER', { create: api.createOrder }, { create: onOrderSuccess })

...
```

Done! Now, every time we order something, the action to load the wallet is dispatched, which updates
the balance value everywhere in our application. Check here the full documentation for
`createResource`. (todo: link).

To implement the first approach we suggested (update the balance value without making a request),
we'd need to use the parameter passed to the success callback. For more information, please, check
our documentation. Also, if you're interested in that approach, check the code for this demo at
(todo: link), we left a commented implementation there!

That's it! The demo application is implemented and we dealt with all requests in a very fast and
organized way. We'd love to hear your opinions on this and, if you have any ideas, feel free to
contribute to our repository (todo: link)!

Before ending this article, we'd like to make a call out for our sister library. Did you see how
much we called load operations? That can turn into a problem, we call "load wallet", for instance,
every time any container is mounted. Most of the time we already know the content of the wallet, or
the catalog, we don't really need to make the request again. We can't just call it in the first page
and use the value after. What if the user enters the direct URL and skips the first page? We could
check for `resource.data` before every call, but this adds unnecessary code and wouldn't work in
every situation, sometimes we really need to refresh the content of the resource. Our solution is a
simple cache system for redux actions. If you want to know more about it, check our other article
that implements this solution in the demonstration project we developed throughout this article.
