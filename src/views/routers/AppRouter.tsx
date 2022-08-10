import React, {useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import {isDevServer} from "../../../webpack/env";
import {store} from "@src/state/store";
import PrivateRoute from "./PrivateRoute";
import TravelerRegisterPage from "@src/views/auth/TravelerRegisterPage";
import CheckInboxPage from "@src/views/auth/CheckInboxPage";
import ErrorPage from "@src/views/common/ErrorPage";
import HostRegisterPage from "@src/views/auth/HostRegisterPage";
// @ts-ignore
import {doSetProfile, doSetRole, retrieveUserProfile, updateUserInfo} from "@src/state/stores/user/operations";
import {getCookie, hasCookie} from "@src/utilities/cookies";
import LandingPage from "@src/views/LandingPage";
import SecuredSiteRouter from "@src/views/routers/SecureSiteRouter";
import {useAppDispatch, useAppSelector} from "@src/state/stores/hooks";
import {TravelerProfile} from "@src/state/stores/user/models";

const AppRouter :React.FunctionComponent = () =>{

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state)=>state.session.authenticationSlice.profile);
    const userRole = useAppSelector((state)=>state.session.authenticationSlice.role);

    useEffect(()=>{
        if(!userRole&&hasCookie('role')){
            dispatch(doSetRole(getCookie('role')))
        }
    },[])

    useEffect(()=>{
        if(userRole){
            if(!hasCookie('profile')){
                dispatch(updateUserInfo(userRole));
                return;
            }
            if(hasCookie('profile')){
                let profile:TravelerProfile = JSON.parse(getCookie('profile'));
                dispatch(doSetProfile(profile));
            }
        }
    },[userRole])

    return(
        <Router>
           <Routes>
             <Route path="/registerAsTraveler" element={<TravelerRegisterPage/>}></Route>
             <Route path="/registerAsHost" element={<HostRegisterPage/>}></Route>
             <Route path="/check-inbox" element={<CheckInboxPage/>}></Route>
             <Route path="/not-found" element={<ErrorPage/>}></Route>
             <Route path="/home" element={<LandingPage/>}/>
             <Route path="*" element={
                 <PrivateRoute>
                     <SecuredSiteRouter/>
                 </PrivateRoute>
             }/>
           </Routes>
        </Router>
    )
}

export default AppRouter;