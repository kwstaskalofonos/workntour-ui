import React, {useEffect, useState} from "react"
import TopMenu from "./common/TopMenu";
// @ts-ignore
import mainSection from "@src/assets/mainBanner.png";
// @ts-ignore
import appBanner from "@src/assets/Bannerworkntour.png";
import HostStepsSection from "./common/HostStepsSection";
import TravelerStepsSection from "../views/common/TravelerStepsSection";
import {Constants} from "../utilities/constants";
import LandPageTopMenu from "@src/views/common/LandPageTopMenu";

export const LandingPage: React.FunctionComponent = () =>{

    const [selectedTab,setSelectedTab] = useState<string>("HOSTS");

    const scrollToSection = () =>{
        // @ts-ignore
        document.getElementById("description").scrollIntoView({behavior:'smooth'});
    }

    return(
        <React.Fragment>
            <div className="columns mb-0" style={{"boxShadow":"0px 4px 18px rgba(0, 0, 0, 0.15)"}}>
                <div className="column container">
                    <LandPageTopMenu/>
                </div>
            </div>
            <section className="section" style={{"background":"rgba(185, 179, 223, 0.1)"}}>
                    <div className="columns is-vcentered is-centered py-6">
                        <div className="column is-narrow-desktop has-text-center">
                            <p className="is-size-2 has-text-weight-bold mb-4" style={{"color":"#6455BB"}}>Work. Travel. Connect.</p>
                            <p className="is-size-4 has-text-weight-medium" style={{"color":"#03D0BC"}}>Workntour promotes development through travel!</p>
                            <p className="is-size-5 has-text-weight-normal" style={{"color":"#8B9389","opacity":"0.7"}}>The travelers offer to work for a few hours a day in exchange for food</p>
                            <p className="is-size-5 has-text-weight-normal" style={{"color":"#8B9389","opacity":"0.7"}}>and accommodation, while the hosts make use of their skills and</p>
                            <p className="is-size-5 has-text-weight-normal mb-6" style={{"color":"#8B9389","opacity":"0.7"}}>time during their stay.</p>
                            <button className="button is-info has-text-dark" onClick={()=>scrollToSection()}>Learn More</button>
                        </div>
                        <div className={"column is-1"}></div>
                        <div className="column is-narrow">
                            <img src={mainSection} width="487" height="384.96"/>
                        </div>
                    </div>
            </section>

            <section className="section" id={"description"}  style={{"background":"rgba(182, 255, 251, 0.1)"}}>
                <div className="container has-text-centered">
                    <p className="is-size-3 has-text-weight-bold has-text-dark">How it works</p>
                        <div className={"is-flex is-justify-content-center mt-6"}>
                            <a className={"button is-primary "+(selectedTab=="TRAVELERS"?'is-underlined':'is-inverted')} onClick={()=>setSelectedTab("TRAVELERS")}>Travelers</a>
                            <a className={"button is-primary "+(selectedTab=="HOSTS"?'is-underlined':'is-inverted')} onClick={()=>setSelectedTab("HOSTS")}>Hosts</a>
                        </div>
                </div>
                {selectedTab == "HOSTS"?
                    <HostStepsSection/>:<TravelerStepsSection/>
                }
            </section>
            <section className={"hero is-large"} style={{backgroundImage: `url(${appBanner})`,
                backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:'center 35%'}}>
                <div className={"hero-body"}></div>
            </section>
            <section className={"section px-0"}>
                <div className={"container is-max-desktop has-text-centered mt-5"}>
                    <p className="is-size-2 has-text-weight-bold">Find out when we launch &</p>
                    <p className="is-size-2 has-text-weight-bold">get an early bird discount</p>
                    <h2 className="subtitle mt-3">Get on the waiting list of hosts and travelers</h2>
                    <div className={"columns"}>
                        <div className={"column is-half is-offset-one-quarter"}>
                            <div className="field is-grouped">
                                <p className="control is-expanded mr-1">
                                    <input id={"langPageEmail"} className="input" type="text" placeholder="Please type your email here..."/>
                                </p>
                                <p className="control">
                                    <a className="button is-primary">
                                        Subscribe
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className={"mt-6"} style={{"border":"1px solid #7E6FD8"}}/>
                </div>
            </section>
            <footer className="footer has-background-white pt-0">
                <div className="content has-text-centered">
                    <p>© Copyright Workntour 2022. All Rights Reserved
                    </p>
                </div>
            </footer>
        </React.Fragment>
    )
};

export default LandingPage;