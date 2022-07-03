import React from "react";
import {Route, Routes} from "react-router-dom";
import Opportunities from "@src/views/host/opportunities/Opportunities";

const CompanyRouter: React.FunctionComponent = () =>{


    return(
         <Routes>
             <Route path="/" element={<h1>Comp1</h1>}/>
             <Route path="opportunities" element={<Opportunities/>}/>
         </Routes>
    )
};

export default CompanyRouter;