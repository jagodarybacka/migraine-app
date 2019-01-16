import React from 'react';
import { isBrowser } from 'react-device-detect';
import Web from './base/web/Web'
import Mobile from './base/mobile/Mobile'

const App = () => {
  if (isBrowser) {
    return <Web />
  }
  return <Mobile />
}

export default App;
