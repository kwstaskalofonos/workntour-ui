import React from "react";
import TopMenu from "../common/TopMenu";

const CompanyRouter: React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <div className="columns mb-0" style={{"boxShadow":"0px 4px 18px rgba(0, 0, 0, 0.15)"}}>
                <div className="column container">
                    <TopMenu/>
                </div>
            </div>
        </React.Fragment>
    )
};

export default CompanyRouter;