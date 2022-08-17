import React, {useEffect, useState} from "react"
// @ts-ignore
import mainSection from "@src/assets/mainBanner.png";
// @ts-ignore
import mainSection from "@src/assets/mainBanner.png";
// @ts-ignore
import appBanner from "@src/assets/Bannerworkntour.png";
import {Constants} from "../utilities/constants";
import Footer from "@src/views/common/Footer";
import Header from "@src/views/common/Header";
import InterCom from "@src/views/common/InterCom";
import {GenericResponse, subscribe} from "@src/utilities/fetch";
import {toast} from "react-toastify";
import HostStepsSection from "@src/views/common/HostStepsSection";
import TravelerStepsSection from "@src/views/common/TravelerStepsSection";

export const LandingPage: React.FunctionComponent = () =>{

    const [selectedTab,setSelectedTab] = useState<string>("HOSTS");
    const [email,setEmail] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const scrollToSection = () =>{
        // @ts-ignore
        document.getElementById("description").scrollIntoView({behavior:'smooth'});
    }

    const isEmail = () =>{
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const doSubscribe = () =>{
        if(!isEmail()){
            toast.error("Input is not valid email address.",{position:toast.POSITION.TOP_RIGHT});
            return;
        }
        setIsLoading(true);
        subscribe(email,setIsLoading).then((response:GenericResponse)=>{
            toast.success("Subscribed successfully",{position:toast.POSITION.TOP_RIGHT});
            setEmail("");
        }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            setEmail("");
        });
    }

    return(
        <React.Fragment>
            <InterCom/>
            <Header/>
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
            <section className={"hero is-large main-banner"}>
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
                                    <input id={"langPageEmail"} className="input" value={email} type="text" placeholder="Please type your email here..."
                                    onChange={(event)=>setEmail(event.target.value)}/>
                                </p>
                                <p className="control">
                                    <a className={"button is-primary "+(isLoading?"is-loading":"")} onClick={()=>doSubscribe()}>
                                        Subscribe
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr className={"mt-6"} style={{"border":"1px solid #7E6FD8"}}/>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
};

export default LandingPage;