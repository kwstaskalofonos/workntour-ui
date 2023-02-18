import React from "react";
import TopMenu from "@src/views/common/TopMenu";

const ErrorPage:React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <div className="columns mb-0" style={{"boxShadow":"0px 4px 18px rgba(0, 0, 0, 0.15)"}}>
                <div className="column container">
                    <TopMenu/>
                </div>
            </div>
            <h1>Not Found</h1>
        </React.Fragment>
    )
};

export default ErrorPage;