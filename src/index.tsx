import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './views/routers/AppRouter';
import './assets/main.scss';
import {ToastContainer} from "react-toastify";
import {store} from "@src/state/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppRouter/>
            <ToastContainer autoClose={2000}/>
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);