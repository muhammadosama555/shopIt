import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux"
import {store,persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';



ReactDOM.render(
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <App />
    </PersistGate>
   </Provider>,
   document.getElementById('root')
);









// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
