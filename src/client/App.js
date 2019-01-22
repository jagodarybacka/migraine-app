import React from 'react';
import { isBrowser } from 'react-device-detect';
import { ThemeProvider } from "@callstack/react-theme-provider";
import {currentTheme} from './themes/ThemeHandler.js';
import Web from './base/web/Web'
import Mobile from './base/mobile/Mobile'

import MetaTags from 'react-meta-tags';

const App = (props) => {
  if (isBrowser) {
    return (
      <div style={{'backgroundColor': '#FAF8F1'}}>
        <MetaTags>
           <meta name="description" content="Mobile diary for migraineurs." />
           <meta property="og:title" content="Migraine App" />
           <meta property="og:image" content="./poster.png" />
         </MetaTags>
        <Web />
      </div>
    )
  }
  return <ThemeProvider theme={currentTheme.theme}>
      <Mobile/>
  </ThemeProvider>
}

export default App;
