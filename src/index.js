import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'http://localhost:5100';
axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
