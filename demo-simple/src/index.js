import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import Header from './containers/header'

class AppComponent extends Component {

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Fragment>
      </Provider>
    )
  }

}

render(<AppComponent />, document.getElementById('root'))
