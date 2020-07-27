import React from 'react';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../login/Login';
import Home from '../Home';
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
