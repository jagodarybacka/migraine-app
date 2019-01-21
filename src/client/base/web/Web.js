import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Download from './Download'
import Home from './Home'
import Reload from './Reload'

const Web = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/download" component={Download}/>
          <Route path="/:other" component={Reload}/>
        </Switch>
      </Router>
    )
}

export default Web;
