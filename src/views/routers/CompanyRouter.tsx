import React, {useEffect} from "react";
import Header from "@src/views/common/Header";
import {Route, Routes} from "react-router-dom";
import TestComponent from "@src/views/host/TestComponent";

const CompanyRouter: React.FunctionComponent = () =>{


    return(
        <React.Fragment>
            <Header/>
            <h1>Company Router</h1>
        </React.Fragment>
    )
};

export default CompanyRouter;