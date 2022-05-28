import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import {isDevServer} from "../../../webpack/env";
import {store} from "../../state/store";
import LandingPage from "../LandingPage";
import PrivateRoute from "./PrivateRoute";
import TravelerRegisterPage from "@src/views/auth/TravelerRegisterPage";
import CheckInboxPage from "@src/views/auth/CheckInboxPage";

const AppRouter :React.FunctionComponent = () =>{

    const title = isDevServer?"You are in devServer":"You are in production mode";


    return(
       <Provider store={store}>
         <Router>
            <Routes>
              <Route path="/registerAsTraveler" element={<TravelerRegisterPage/>}></Route>
              <Route path="/check-inbox" element={<CheckInboxPage/>}></Route>
              <Route path="/guest-dashboard" element={<LandingPage/>}/>
              <Route path="/" element={<PrivateRoute/>}/>
              {/* <Route path="/secured" element={isAuthenticated?<Test/>:<LandingPage/>}/> */}
            </Routes>
         </Router>
       </Provider>
    )
}

export default AppRouter;