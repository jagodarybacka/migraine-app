import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './client/index.css';
import App from './client/App';

import * as serviceWorker from './client/serviceWorker';

axios.defaults.baseURL = 'http://localhost:8080/api';

axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
    localStorage.setItem('isLogged', false);
    window.location = "/join";
   }
   return error;
 });

if (module.hot) {
    module.hot.accept();
 }

ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
