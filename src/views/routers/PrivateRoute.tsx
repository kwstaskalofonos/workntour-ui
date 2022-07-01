import React, {useEffect} from "react";
import { Route, RouteProps, Navigate,Outlet } from "react-router-dom"
import LandingPage from "../LandingPage";
import SecuredSiteRouter from "./SecureSiteRouter";
import {hasCookie} from "@src/utilities/cookies";


const PrivateRoute: React.FunctionComponent<RouteProps> = ({children,
                                                               ...properties})=>{

    const isAuthenticated=hasCookie();
    useEffect(()=>{
        console.log("sfasfa");
    })

    return(
        <Route
            element={isAuthenticated ? children : <Navigate to={"/home"}/>}/>
    )
};

export default PrivateRoute;


{/*{isAuthenticated ?*/}
{/*    <SecuredSiteRouter/>:*/}
{/*    <LandingPage/>*/}
{/*}*/}