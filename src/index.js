import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; //imported serviceWorkerRegistration
import reportWebVitals from './reportWebVitals';

import * as atatus from 'atatus-spa';
atatus.config('c6d106a585324cfdbb584b429b344213').install();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <App />
 </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

console.log('Test Atatus Setup');
atatus.notify(new Error('Test Atatus Setup'));console.log('Test Atatus Setup Done');

