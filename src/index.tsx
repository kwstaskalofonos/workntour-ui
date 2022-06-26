import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './views/routers/AppRouter';
import './assets/main.scss';
import {ToastContainer} from "react-toastify";

ReactDOM.render(
    <React.StrictMode>
        <ToastContainer autoClose={2000}/>
        <AppRouter/>
    </React.StrictMode>,
  document.getElementById('root')
);