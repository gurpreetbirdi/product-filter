import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link, Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import Login from './Login';

const AuthExample = () => {
return(
  <Router>
    <Switch>
      <Route path= '/login' component={Login}/>
      <Route component={Login} />
    </Switch>
  </Router>
);
}

export default AuthExample;
