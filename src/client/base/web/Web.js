import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Download from './Download'
import Home from './Home'

const Web = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/download" component={Download}/>
        </Switch>
      </Router>
    )
}

export default Web;
