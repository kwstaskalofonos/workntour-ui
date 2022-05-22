import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { Profile } from "./models";

export interface AuthenticationState{
    token?:string|null,
    profile?:Profile|null,
}

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{token:null},
    reducers:{
        set:(state:AuthenticationState,action:PayloadAction<{token:string,profile:Profile}>)=>{
            state.token = action.payload.token;
            state.profile = action.payload.profile;
        }
    }
});

export default combineReducers({
    authenticationSlice:authenticationSlice.reducer
})