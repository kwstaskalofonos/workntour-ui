import React from "react";
import conWithHosts from "../../assets/hosts/connectWithHosts.png";
import joinTheCom from "../../assets/hosts/joinTheCommunity.png";
import liveLikeALocal from "../../assets/hosts/liveLikeALocal.png";
import review from "../../assets/hosts/review.png";
import one from "../../assets/hosts/Group1.png";
import two from "../../assets/hosts/Group2.png";
import three from "../../assets/hosts/Group3.png";
import four from "../../assets/hosts/Group4.png";

const HostStepsSection: React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            {/* STEP 1 */}
            <div className="columns is-vcentered">
                <div className="column has-text-right"><img src={one} width={210} height={122}/></div>
                <div className="column has-text-left"><img src={joinTheCom} width={371} height={371}/></div>
            </div>
            {/* STEP 2 */}
            <div className="columns is-vcentered">
                <div className="column has-text-right"><img src={conWithHosts} width={371} height={371}/></div>
                <div className="column  has-text-left"><img src={two} width={210} height={122}/></div>
            </div>
            {/* STEP 3 */}
            <div className="columns is-vcentered">
                <div className="column has-text-right"><img src={three} width={210} height={122}/></div>
                <div className="column  has-text-left"><img src={liveLikeALocal} width={371} height={371}/></div>
            </div>
            {/* STEP 4 */}
            <div className="columns is-vcentered">
                <div className="column has-text-right"><img src={review} width={371} height={371}/></div>
                <div className="column  has-text-left"><img src={four} width={210} height={122}/></div>
            </div>
        </React.Fragment>
    )
};

export default HostStepsSection;