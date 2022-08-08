import React, {useEffect} from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import {isDevServer} from "../../../webpack/env";
import {store} from "@src/state/store";
import PrivateRoute from "./PrivateRoute";
import TravelerRegisterPage from "@src/views/auth/TravelerRegisterPage";
import CheckInboxPage from "@src/views/auth/CheckInboxPage";
import ErrorPage from "@src/views/common/ErrorPage";
import HostRegisterPage from "@src/views/auth/HostRegisterPage";
// @ts-ignore
import {retrieveUserProfile} from "@src/state/stores/user/operations";
import {getCookie, hasCookie} from "@src/utilities/cookies";
import LandingPage from "@src/views/LandingPage";
import SecuredSiteRouter from "@src/views/routers/SecureSiteRouter";
import Opportunity from "@src/views/host/opportunities/Opportunity";

const AppRouter :React.FunctionComponent = () =>{

    const userRole:string|undefined = getCookie("role");

    useEffect(()=>{
        if(!hasCookie('profile')){
            retrieveUserProfile();
        }
    },[])

    return(
       <Provider store={store}>
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
       </Provider>
    )
}

export default AppRouter;