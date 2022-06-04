import React from "react";
// @ts-ignore
import one from "@src/assets/traveler/1.png";
// @ts-ignore
import bePartOf from "@src/assets/traveler/bePartOf.png";
// @ts-ignore
import two from "@src/assets/traveler/2.png";
// @ts-ignore
import findYourPref from "@src/assets/traveler/findYourPref.png";
// @ts-ignore
import three from "@src/assets/traveler/3.png";
// @ts-ignore
import bookYourStay from "@src/assets/traveler/bookYourStay.png";
// @ts-ignore
import four from "@src/assets/traveler/4.png";
// @ts-ignore
import review from "@src/assets/traveler/review.png";

const TravelerStepsSection: React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <React.Fragment>
                {/* STEP 1 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow has-text-right"><img src={one} width={210} height={122}/></div>
                    <div className="column is-narrow has-text-left"><img src={bePartOf} width={271} height={271}/></div>
                </div>
                {/* STEP 2 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow has-text-right"><img src={findYourPref} width={271} height={271}/></div>
                    <div className="column is-narrow has-text-left"><img src={two} width={210} height={122}/></div>
                </div>
                {/* STEP 3 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow has-text-right"><img src={three} width={210} height={122}/></div>
                    <div className="column is-narrow has-text-left"><img src={bookYourStay} width={271} height={271}/></div>
                </div>
                {/* STEP 4 */}
                <div className="columns is-vcentered is-centered">
                    <div className="column is-narrow has-text-right"><img src={review} width={271} height={271}/></div>
                    <div className="column is-narrow has-text-left"><img src={four} width={210} height={122}/></div>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
};

export default TravelerStepsSection;