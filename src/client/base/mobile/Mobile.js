import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Welcome from '../../scenes/Welcome'
import Join from '../../scenes/Join'
import Login from '../../scenes/Login'
import ForgottenPassword from '../../scenes/ForgottenPassword'
import ResetPassword from '../../scenes/ResetPassword'
import Home from '../../scenes/Home'
import RecordForm from '../../scenes/RecordForm'
import Register from '../../scenes/Register'
import Settings from '../../scenes/Settings'
import History from '../../scenes/history/History'
import Summary from '../../scenes/form/Summary'
import TextInput from '../../components/TextInput'
import Reports from '../../scenes/Reports'

const PrivateRoute = ({ isLogged, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        isLogged ? (<Component {...props} />) : (<Redirect to="/join" />)
      )}
    />
  );
};

const Mobile = () => {
  axios.defaults.withCredentials = true; // very important for session
  const isLogged = window.localStorage.getItem('isLogged') === 'true';

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/join" component={Join}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/forgot" component={ForgottenPassword}/>
          <Route path="/reset/:token" component={ResetPassword}/>
          <PrivateRoute exact isLogged={isLogged} path="/home" component={Home} />
          <PrivateRoute exact isLogged={isLogged} path="/add" component={RecordForm} />
          <PrivateRoute exact isLogged={isLogged} path="/history" component={History} />
          <PrivateRoute exact isLogged={isLogged} path="/settings" component={Settings} />
          <PrivateRoute exact isLogged={isLogged} path="/summary" component={Summary} />
          <PrivateRoute exact isLogged={isLogged} path="/reports" component={Reports} />
        </Switch>
      </Router>
    </div>
  );
}

export default Mobile
