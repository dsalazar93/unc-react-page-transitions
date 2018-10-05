## Install

Install it with npm (`npm install unc-react-page-transitions --save`). Here's a simple example:

```jsx
import React from 'react';
import { render } from 'react-dom';
import { PageTransitions, Page } from 'unc-react-page-transitions';

const loadedPageTriggers = [
  { f: () => { console.log('loaded'); }, r: true }
];

const leavedPageTriggers = [
  { f: () => { console.log('leaved'); }, r: true }
];

class App extends React.Component {
  render() {
    return (
      <div id="example-wrapper" style={{ height: 500, overflow: 'hidden' }}>
        <button className="btn btn-light" onClick={() => { this.pt.nextPage(); }} 
                style={{ position: 'absolute', margin: '1em', zIndex: 10 }}>Next Page</button>

        <PageTransitions ref={ (pt) => { this.pt = pt; } }>
          <Page style={{ backgroundColor: '#f68dbb' }}>
            <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
          </Page>

          <Page style={{ backgroundColor: '#0ac2d2' }}
                loadedPageTriggers={loadedPageTriggers}
                leavedPageTriggers={leavedPageTriggers}>
            <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
          </Page>

          <Page style={{ backgroundColor: '#7bb7fa' }}>
            <h1><small>A Collection of</small><strong>PAGE</strong> TRANSITIONS</h1>
          </Page>
        </PageTransitions>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
);
```

## Documentation

Documentation and demo can be found here: http://jpbaena13.github.io/unc-react-page-transitions/