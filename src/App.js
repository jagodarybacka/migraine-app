import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components'

import Welcome from './scenes/Welcome'
import Join from './scenes/Join'
import Login from './scenes/Login'
import Home from './scenes/Home'
import Form from './scenes/Form'
import Register from './scenes/Register'
import History from './scenes/history/History'
import TextInput from './components/TextInput'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/join" component={Join}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/home" component={Home}/>
          <Route path="/add" component={Form}/>
          <Route path="/history" component={History}/>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
