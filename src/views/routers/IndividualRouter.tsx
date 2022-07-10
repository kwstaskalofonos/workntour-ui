import React from "react";
import {Route, Routes} from "react-router-dom";
import Opportunities from "@src/views/host/opportunities/Opportunities";

const IndividualRouter: React.FunctionComponent = () =>{

    return(
        <Routes>
            <Route path="/" element={<Opportunities/>}/>
            <Route path="opportunities" element={<Opportunities/>}/>
        </Routes>
    )
};

export default IndividualRouter;