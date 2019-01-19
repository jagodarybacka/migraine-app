import React from 'react';
import { isBrowser } from 'react-device-detect';
import Web from './base/web/Web'
import Mobile from './base/mobile/Mobile'
import DocumentMeta from 'react-document-meta';

const App = () => {
  const meta = {
    title: 'Migraine App',
    description: 'Mobile diary for migraineurs',
  }
  if (isBrowser) {
    return (
      <DocumentMeta extend {...meta}>
        <Web />
      </DocumentMeta>
    )
  }
  return <Mobile />
}

export default App;
