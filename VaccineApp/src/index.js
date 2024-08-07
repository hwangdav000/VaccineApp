import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // set store as top level component of react application

import ApplicationComponent from './app/appComponent';
import store from './state/store'; // build the store

//import 'bootstrap-icons/font/bootstrap-icons.css';

//creating root of the react application where we can load the react app
const root = ReactDOM.createRoot(document.getElementById('root'));

//bootstrapping react application in root element of index.html
// render application beneath provider which contains store
root.render(
  <Provider store={store}>
    <ApplicationComponent />
  </Provider>
);
