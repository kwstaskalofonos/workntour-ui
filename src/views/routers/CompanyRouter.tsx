import React from "react";
import {Route, Routes} from "react-router-dom";

const CompanyRouter: React.FunctionComponent = () =>{


    return(
         <Routes>
             <Route path="/" element={<h1>Comp1</h1>}/>
             <Route path="opportunities" element={<h1>Comp2</h1>}/>
         </Routes>
    )
};

export default CompanyRouter;