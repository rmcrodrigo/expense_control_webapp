import React from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie';
//redux
import {Provider} from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";

import configureStore, {history} from './store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

let initialState = {};

const store = configureStore(initialState);

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App history={history}/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
