import React from "react";
import { Route, Routes} from "react-router-dom";

const TravelerRouter: React.FunctionComponent = () =>{

    return(
        <Routes>
            <Route path="/" element={<h1>Comp Traveler</h1>}/>
        </Routes>
    )
};

export default TravelerRouter;