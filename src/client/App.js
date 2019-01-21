import React from 'react';
import { isBrowser } from 'react-device-detect';
import Web from './base/web/Web'
import Mobile from './base/mobile/Mobile'

import MetaTags from 'react-meta-tags';
const App = () => {
  if (isBrowser) {
    return (
      <div>
        <MetaTags>
           <meta name="description" content="Mobile diary for migraineurs." />
           <meta property="og:title" content="Migraine App" />
           <meta property="og:image" content="./poster.png" />
         </MetaTags>
        <Web />
      </div>
    )
  }
  return <Mobile />
}

export default App;
