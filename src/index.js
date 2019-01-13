import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App'; 
import Firebase, { FirebaseContext } from './components/Firebase';
import { BrowserRouter }from 'react-router-dom';

const finalApp = ( 
    <BrowserRouter>
            <Provider store={store}> 
                <App />
            </Provider>
    </BrowserRouter>
);
ReactDOM.render(finalApp, document.getElementById('root'));


