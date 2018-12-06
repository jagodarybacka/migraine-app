import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './App';

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