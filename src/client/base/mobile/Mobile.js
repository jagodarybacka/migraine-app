import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {withTheme } from "@callstack/react-theme-provider";
import axios from 'axios';
import styled from 'styled-components'

import Welcome from '../../scenes/Welcome'
import Join from '../../scenes/Join'
import Login from '../../scenes/Login'
import ForgottenPassword from '../../scenes/ForgottenPassword'
import ResetPassword from '../../scenes/ResetPassword'
import Home from '../../scenes/Home'
import RecordForm from '../../scenes/RecordForm'
import Register from '../../scenes/Register'
import PrivacyPolicy from '../../scenes/PrivacyPolicy'
import Settings from '../../scenes/settings/Settings'
import History from '../../scenes/history/History'
import Summary from '../../scenes/form/Summary'
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

const AppComponent = styled.div`
  background-color: ${props=>props.theme.backgroundColor};
`

const Mobile = (props) => {
  document.body.style.backgroundColor = props.theme.backgroundColor; // style to body

  axios.defaults.withCredentials = true; // very important for session
  const isLogged = window.localStorage.getItem('isLogged') === 'true';

  return (
    <AppComponent theme={props.theme} className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/join" component={Join}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/privacypolicy" component={PrivacyPolicy}/>
          <Route path="/forgot" component={ForgottenPassword}/>
          <Route path="/reset/:token" component={ResetPassword}/>
          <PrivateRoute exact isLogged={isLogged} path="/home" component={Home} />
          <PrivateRoute exact isLogged={isLogged} path="/add" component={RecordForm} />
          <PrivateRoute exact isLogged={isLogged} path="/edit/:id/" component={RecordForm} />
          <PrivateRoute exact isLogged={isLogged} path="/history" component={History} />
          <PrivateRoute exact isLogged={isLogged} path="/settings" component={Settings} />
          <PrivateRoute exact isLogged={isLogged} path="/summary/:edit?" component={Summary} />
          <PrivateRoute exact isLogged={isLogged} path="/reports" component={Reports} />
        </Switch>
      </Router>
    </AppComponent>
  );
}

export default withTheme(Mobile);
