import React from "react";
import {Route, Routes} from "react-router-dom";
import Opportunities from "@src/views/host/opportunities/Opportunities";
import Opportunity from "@src/views/host/opportunities/Opportunity";
import HostProfilePage from "@src/views/host/profile/HostProfilePage";

const CompanyRouter: React.FunctionComponent = () =>{


    return(
         <Routes>
             <Route path="/" element={<Opportunities/>}/>
             <Route path="opportunities" element={<Opportunities/>}/>
             <Route path="opportunity/:id" element={<Opportunity hostMode={true}/>}/>
             <Route path="profile" element={<HostProfilePage/>}/>
         </Routes>
    )
};

export default CompanyRouter;