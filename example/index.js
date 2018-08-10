/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import { render } from 'react-dom';

import { PageTransitions, Page } from '../src';

render(
  <PageTransitions>
    <Page style={{ backgroundColor: '#f68dbb' }}>
      <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
    </Page>

    <Page style={{ backgroundColor: '#0ac2d2' }}>
      <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
    </Page>

    <Page style={{ backgroundColor: '#7bb7fa' }}>
      <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
    </Page>
  </PageTransitions>,
  document.getElementById('app')
);
