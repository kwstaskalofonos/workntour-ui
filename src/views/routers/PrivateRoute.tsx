import React from "react";
import { Route, RouteProps, Navigate,Outlet } from "react-router-dom"
import LandingPage from "../LandingPage";
import Test from "../TestComponents";
import SecuredSiteRouter from "./SecureSiteRouter";


const PrivateRoute: React.FunctionComponent<RouteProps> = ({children,...properties})=>{

    const isAuthenticated=false;

    return(
        <React.Fragment>
            {isAuthenticated ?
                <SecuredSiteRouter/>:
                <LandingPage/>
            }
        </React.Fragment>
    )
};

export default PrivateRoute;