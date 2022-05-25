import React from "react";
import one from "../../assets/traveler/1.png";
import bePartOf from "../../assets/traveler/bePartOf.png";
import two from "../../assets/traveler/2.png";
import findYourPref from "../../assets/traveler/findYourPref.png";
import three from "../../assets/traveler/3.png";
import bookYourStay from "../../assets/traveler/bookYourStay.png";
import four from "../../assets/traveler/4.png";
import review from "../../assets/traveler/review.png";

const TravelerStepsSection: React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <React.Fragment>
                {/* STEP 1 */}
                <div className="columns is-vcentered">
                    <div className="column has-text-right"><img src={one} width={210} height={122}/></div>
                    <div className="column has-text-left"><img src={bePartOf} width={371} height={371}/></div>
                </div>
                {/* STEP 2 */}
                <div className="columns is-vcentered">
                    <div className="column has-text-right"><img src={findYourPref} width={371} height={371}/></div>
                    <div className="column  has-text-left"><img src={two} width={210} height={122}/></div>
                </div>
                {/* STEP 3 */}
                <div className="columns is-vcentered">
                    <div className="column has-text-right"><img src={three} width={210} height={122}/></div>
                    <div className="column  has-text-left"><img src={bookYourStay} width={371} height={371}/></div>
                </div>
                {/* STEP 4 */}
                <div className="columns is-vcentered">
                    <div className="column has-text-right"><img src={review} width={371} height={371}/></div>
                    <div className="column  has-text-left"><img src={four} width={210} height={122}/></div>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
};

export default TravelerStepsSection;