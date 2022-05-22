import {AuthenticationState} from './stores/user/reducers';
import * as reducers from "./";
import { applyMiddleware, combineReducers, compose, createStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

export interface RootState{
    session:AuthenticationState
}

const rootReducer = combineReducers(reducers);

const composeEnhancers = typeof window === 'object' && 
//@ts-ignore
window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ ?
//@ts-ignore
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer,enhancer);
