import React from "react";
import {Navigate, RouteProps} from "react-router-dom"
import {hasCookie} from "@src/utilities/cookies";

// @ts-ignore
const PrivateRoute: React.FunctionComponent<RouteProps> = ({children,...properties})=>{

    const isAuthenticated=hasCookie();
    return isAuthenticated ? children : <Navigate to={"/home"}/>
};

export default PrivateRoute;