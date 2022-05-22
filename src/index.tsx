import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './views/routers/AppRouter';
import './assets/main.scss';

ReactDOM.render(
    <React.StrictMode>
        <AppRouter/>
    </React.StrictMode>,
  document.getElementById('root')
);