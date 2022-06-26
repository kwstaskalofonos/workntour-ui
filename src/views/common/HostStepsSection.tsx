import React, {useEffect} from "react";
// @ts-ignore
import conWithHosts from "@src/assets/hosts/connectWithHosts.png";
// @ts-ignore
import joinTheCom from "@src/assets/hosts/joinTheCommunity.png";
// @ts-ignore
import liveLikeALocal from "@src/assets/hosts/liveLikeALocal.png";
// @ts-ignore
import review from "@src/assets/hosts/review.png";
import { isMobile } from 'react-device-detect';

const HostStepsSection: React.FunctionComponent = () =>{

    const browserView = () =>{
        return (
            <React.Fragment>
                {/* STEP 1 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>1.</p>
                        <div className={"ml-4 pt-5"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Join the community</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Describe the opportunity <br/>you offer</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-left"><img src={joinTheCom} width={271} height={271}/></div>
                </div>
                {/* STEP 2 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow has-text-right"><img src={conWithHosts} width={271} height={271}/></div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>2.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Connect with Travelers</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Travelers can directly contact you</p>
                        </div>
                    </div>
                </div>
                {/* STEP 3 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>3.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Share your culture</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Accept the offer</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-left"><img src={liveLikeALocal} width={271} height={271}/></div>
                </div>
                {/* STEP 4 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow has-text-right"><img src={review} width={271} height={271}/></div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>4.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Review</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Give your feedback</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    const mobileView = () =>{
        return(
            <React.Fragment>
                {/* STEP 1 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>1.</p>
                        <div className={"ml-4 pt-5"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Join the community</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Describe the opportunity <br/>you offer</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-left"><img src={joinTheCom} width={271} height={271}/></div>
                </div>
                {/* STEP 2 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>2.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Connect with Travelers</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Travelers can directly contact you</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-right"><img src={conWithHosts} width={271} height={271}/></div>
                </div>
                {/* STEP 3 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>3.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Share your culture</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Accept the offer</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-left"><img src={liveLikeALocal} width={271} height={271}/></div>
                </div>
                {/* STEP 4 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>4.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Review</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Give your feedback</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-right"><img src={review} width={271} height={271}/></div>
                </div>
            </React.Fragment>
        );
    }


    return(
        <React.Fragment>
            {!isMobile ?
                browserView():mobileView()
            }
        </React.Fragment>
    )
};

export default HostStepsSection;