import React from 'react'
import { Switch, Route } from 'react-router-dom'
import URIList from './URIList'
import URI from './URI'
// The dashbpard component matches one of two different routes
// depending on the full pathname
const Dashboard = () => (
  <Switch>
    <Route exact path='/URIList' component={URIList}/>
    <Route path='/URIList/:number' component={URI}/>
  </Switch>
)


export default Roster