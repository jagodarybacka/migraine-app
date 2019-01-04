import React, { Component } from 'react';
import { isMobile, isBrowser } from 'react-device-detect';
import Web from './base/web/Web'
import Mobile from './base/mobile/Mobile'

const App = () => {
  if (isBrowser) {
    return <Web />
  }
  return <Mobile />
}

export default App;
