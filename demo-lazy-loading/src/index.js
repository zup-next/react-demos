import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Home from 'containers/home'

class AppComponent extends Component {

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }

}

render(<AppComponent />, document.getElementById('root'))
