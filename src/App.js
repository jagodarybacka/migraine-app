import React from 'react'
import styled from 'styled-components'

import Welcome from './scenes/Welcome'
import Join from './scenes/Join'
import Login from './scenes/Login'
import Register from './scenes/Register'
import TextInput from './components/TextInput'

const App = () => {
  return (
    <div className="App">
      <Join />
    </div>
  );
}


export default App;
