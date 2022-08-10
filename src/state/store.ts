import {AuthenticationState} from './stores/user/reducers';
import * as reducers from "./";
import {
    applyMiddleware,
    combineReducers,
    compose,
    configureStore
} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

export interface StateRoot{
    session:AuthenticationState
}

const rootReducer = combineReducers(reducers);

const composeEnhancers = typeof window === 'object' && 
    //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ ?
        //@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

export const store = configureStore({reducer:rootReducer,enhancers:[enhancer]});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;