import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components'
import React, { Component } from 'react';
import axios from "axios";

import Welcome from './scenes/Welcome'
import Join from './scenes/Join'
import Login from './scenes/Login'
import Home from './scenes/Home'
import RecordForm from './scenes/RecordForm'
import Register from './scenes/Register'
import History from './scenes/history/History'
import TextInput from './components/TextInput'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: true,
      user: {}
    }
  }
  render() {
  	axios.defaults.withCredentials = true; // very important for session
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route path="/join" component={Join}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/home" component={Home}/>
            <Route path="/add" component={RecordForm}/>
            <Route path="/history" component={History}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
