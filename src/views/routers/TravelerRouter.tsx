import React from "react";
import TopMenu from "@src/views/common/TopMenu";

const TravelerRouter: React.FunctionComponent = () =>{

    return(<div className="columns">
        <div className="column is-four-fifths is-offset-1">
            <TopMenu/>
        </div>
    </div>)
};

export default TravelerRouter;