import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {CompanyHostProfile, IndividualHostProfile, Profile, Role, TravelerProfileDTO} from "./models";

export interface AuthenticationState{
    token?:string|null,
    role?:string|null,
    profile?:TravelerProfileDTO|IndividualHostProfile|CompanyHostProfile|null,
}

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{token:null,profile:null,role:null},
    reducers:{
        setProfile:(state:AuthenticationState,action:PayloadAction<{profile:TravelerProfileDTO|IndividualHostProfile|CompanyHostProfile|null}>)=>{
            state.profile = action.payload.profile;
        },
        setRole:(state:AuthenticationState,action:PayloadAction<{role:string|null}>)=>{
            state.role = action.payload.role;
        }
    }
});


export default combineReducers({
    authenticationSlice:authenticationSlice.reducer
})