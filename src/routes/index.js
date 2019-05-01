import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../containers/home'
import Movie from '../containers/movie'
import Payment from '../containers/payment'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/movie/:id" component={Movie} />
    <Route path="/payment/:id" component={Payment} />
  </Switch>
)
