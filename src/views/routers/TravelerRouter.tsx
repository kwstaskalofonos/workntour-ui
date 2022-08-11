import React from "react";
import { Route, Routes} from "react-router-dom";
import HomePage from "@src/views/traveler/home/HomePage";
import Opportunity from "@src/views/host/opportunities/Opportunity";
import TravelerProfilePage from "@src/views/traveler/profile/TravelerProfilePage";

const TravelerRouter: React.FunctionComponent = () =>{

    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="opportunity/:id" element={<Opportunity hostMode={false}/>}/>
            <Route path="profile" element={<TravelerProfilePage/>}/>
        </Routes>
    )
};

export default TravelerRouter;