import React from "react";
import {getDateFromString} from "@src/utilities/ui";

const LoadingOpportunity:React.FunctionComponent = () =>{

    return(
        <div className="card">
            <div className="card-image pt-2">
                <div style={{height:"180px"}}>
                    <progress className="progress is-large is-white" max="100"
                    style={{height:"100%"}}></progress>
                </div>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="is-5 has-text-weight-semibold">
                            <progress className="progress is-large is-white" max="100"></progress>
                        </p>
                    </div>
                </div>

            </div>
            <div className="card">
                <footer className="card-footer">
                    {/*<a href="#" className="card-footer-item has-text-primary has-text-weight-semibold">Edit</a>*/}
                    <a className="card-footer-item has-text-danger has-text-weight-semibold">
                        <progress className="progress is-large is-white" max="100"></progress>
                    </a>
                </footer>
            </div>
        </div>
    )
};

export default LoadingOpportunity;