import React from "react";
import {Route, Routes} from "react-router-dom";

const IndividualRouter: React.FunctionComponent = () =>{

    return(
        <Routes>
            <Route path="/" element={<h1>Comp Individual</h1>}/>
        </Routes>
    )
};

export default IndividualRouter;