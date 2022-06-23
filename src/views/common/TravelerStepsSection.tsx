import React from "react";
// @ts-ignore
import bePartOf from "@src/assets/traveler/bePartOf.png";
// @ts-ignore
import findYourPref from "@src/assets/traveler/findYourPref.png";
// @ts-ignore
import bookYourStay from "@src/assets/traveler/bookYourStay.png";
// @ts-ignore
import review from "@src/assets/traveler/review.png";

const TravelerStepsSection: React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <React.Fragment>
                {/* STEP 1 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>1.</p>
                        <div className={"ml-4 pt-5"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Be part of the Local <br/> Community</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Create a Profile and plan your Trip</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-left"><img src={bePartOf} width={271} height={271}/>
                    </div>
                </div>
                {/* STEP 2 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow has-text-right"><img src={findYourPref} width={271} height={271}/></div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>2.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Find your preferred Hosts</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Search Hosts by location</p>
                        </div>
                    </div>
                </div>
                {/* STEP 3 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow is-flex is-align-content-baseline">
                        <p className={"is-italic has-text-info has-text-weight-bold"} style={{fontSize:"76px"}}>3.</p>
                        <div className={"ml-4 py-6"}>
                            <p className={"has-text-primary has-text-weight-bold"} style={{fontSize:"18px"}}>Book your Stay</p>
                            <p className={"has-text-weight-semibold"} style={{fontSize:"14px"}}>Let the adventure begin</p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className="column is-narrow has-text-left"><img src={bookYourStay} width={271} height={271}/></div>
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
        </React.Fragment>
    )
};

export default TravelerStepsSection;