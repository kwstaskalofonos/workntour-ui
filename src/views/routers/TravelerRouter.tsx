import React from "react";
import { Route, Routes} from "react-router-dom";
import HomePage from "@src/views/traveler/home/HomePage";

const TravelerRouter: React.FunctionComponent = () =>{

    return(
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    )
};

export default TravelerRouter;