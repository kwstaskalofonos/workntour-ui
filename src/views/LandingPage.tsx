import React, {useEffect} from "react"
// @ts-ignore
import mainSection from "@src/assets/mainBanner.png";
// @ts-ignore
import appBanner from "@src/assets/appBanner.png";
import {Constants} from "../utilities/constants";
import TopMenu from "@src/views/common/TopMenu";
import Footer from "@src/views/common/Footer";
import Header from "@src/views/common/Header";
import InterCom from "@src/views/common/InterCom";

export const LandingPage: React.FunctionComponent = () =>{


    useEffect(()=>{
        console.log("__API_URL__ : "+Constants.getApiUrl());
    },[])

    return(
        <React.Fragment>
            <InterCom/>
            <Header/>
            <section className="section" style={{"background":"rgba(185, 179, 223, 0.1)"}}>
                    <div className="columns is-vcentered is-centered py-6">
                        <div className="column is-narrow-desktop has-text-center">
                            <p className="is-size-2 has-text-weight-bold mb-4" style={{"color":"#6455BB"}}>Work. Travel. Connect.</p>
                            <p className="is-size-4 has-text-weight-medium" style={{"color":"#03D0BC"}}>Workntour is a platform that promotes working</p>
                            <p className="is-size-4 has-text-weight-medium mb-4" style={{"color":"#03D0BC"}}>holidays in Creece!</p>
                            <p className="is-size-5 has-text-weight-normal" style={{"color":"#8B9389","opacity":"0.7"}}>The travelers work for a fiew hours a day in exchange for food</p>
                            <p className="is-size-5 has-text-weight-normal" style={{"color":"#8B9389","opacity":"0.7"}}>and accomodation, while the hosts make use of their skills and</p>
                            <p className="is-size-5 has-text-weight-normal mb-6" style={{"color":"#8B9389","opacity":"0.7"}}>time during their stay.</p>
                            <button className="button is-info has-text-dark">Learn More</button>
                        </div>
                        <div className={"column is-1"}></div>
                        <div className="column is-narrow">
                            <img src={mainSection} width="487" height="384.96"/>
                        </div>
                    </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
};

export default LandingPage;