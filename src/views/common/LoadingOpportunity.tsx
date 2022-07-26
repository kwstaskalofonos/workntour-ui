import React from "react";

const LoadingOpportunity:React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <div className="each-slide-effect" style={{position:"relative",height:"315px"}}>
                <progress className="progress is-large is-white" max="100"
                          style={{height:"100%"}}></progress>
            </div>
                <p className={"mt-1"} style={{width:"73%"}}>
                    <progress className="progress is-large is-white" max="100"></progress>
                </p>
                <p className={"mt-1"} style={{width:"73%"}}>
                    <progress className="progress is-large is-white" max="100"></progress>
                </p>
                <p className={"mt-1"} style={{width:"73%"}}>
                    <progress className="progress is-large is-white" max="100"></progress>
                </p>
        </React.Fragment>
    )
};

export default LoadingOpportunity;