import React, {useEffect, useState} from "react"
// @ts-ignore
import mainSection from "@src/assets/mainBanner.png";
// @ts-ignore
// @ts-ignore
import leftImage from "@src/assets/newLandingPage/left.png";
// @ts-ignore
import rightImage from "@src/assets/newLandingPage/right.png";
// @ts-ignore
import airplane from "@src/assets/newLandingPage/airplane.png";
// @ts-ignore
import plane from "@src/assets/newLandingPage/plane.svg";
// @ts-ignore
import media from "@src/assets/newLandingPage/media.svg";
// @ts-ignore
import formLogo from "@src/assets/newLandingPage/form.png";
import Header from "@src/views/common/Header";
import InterCom from "@src/views/common/InterCom";
import {isMobile} from 'react-device-detect';
import HostStepsSection from "@src/views/common/HostStepsSection";
import TravelerStepsSection from "@src/views/common/TravelerStepsSection";
import TravelerSubscriptionComponent from "@src/views/landing_components/TravelerSubscriptionComponent";
import HostSubscriptionComponent from "@src/views/landing_components/HostSubscriptionComponent";
import GalleryComponent from "@src/views/landing_components/GalleryComponent";
import {logEvent} from "firebase/analytics";
import {analytics} from "@src/utilities/firebase";
import {isDevServer} from "../../webpack/env";

export const LandingPage: React.FunctionComponent = () => {

    const [selectedTab, setSelectedTab] = useState<string>("HOSTS");
    const [selectedSubTab, setSelectedSubTab] = useState<string>("HOSTS");

    const scrollToSection = () => {
        // @ts-ignore
        document.getElementById("forms").scrollIntoView({behavior: 'smooth'});
    }

    useEffect(()=>{
        if(!isDevServer){
            logEvent(analytics, 'landing_page',{
                content_type:'string',event_label:"Landing Page",
            });
        }
    },[])

    const mobileView = () =>{
        return <React.Fragment>
            <p className="is-size-4 has-text-weight-medium" style={{"color": "#383350"}}>Find experts from
                all over</p>
            <p className="is-size-4 has-text-weight-medium" style={{"color": "#383350"}}>the world & share
                your culture!</p>
            <p className="is-size-6 has-text-weight-medium mt-2" style={{"color": "#7060E1"}}>Receive help
                from enthusiastic</p>
            <p className="is-size-6 has-text-weight-medium" style={{"color": "#7060E1"}}>travelers, provide
                accommodation and</p>
            <p className="is-size-6 has-text-weight-medium" style={{"color": "#7060E1"}}>share your
                culture!</p>
            <img src={rightImage} width={270} height={270}/>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <InterCom/>
            <section className="section landing-page-background" style={{position: "relative"}}>
                <div className={"is-flex is-justify-content-center"}>
                    <div><p className="is-size-3 has-text-weight-bold" style={{"color": "#8870F9"}}>Work. Travel.</p>
                        <p className="is-size-3 has-text-weight-bold"
                           style={{"color": "#8870F9"}}>&nbsp;&nbsp;&nbsp;&nbsp;Connect.</p></div>
                </div>
                <div className="columns is-vcentered is-centered">
                    <div className="column has-text-centered">
                        <p className="is-size-4 has-text-weight-medium" style={{"color": "#383350"}}>Travel the world
                            for free.</p>
                        <p className="is-size-4 has-text-weight-medium" style={{"color": "#383350"}}>Meet locals &
                            collaborate!</p>
                        <p className="is-size-6 has-text-weight-medium mt-2" style={{"color": "#03D0BC"}}>Exchange your
                            skills for food and accommodation!</p>
                        <img className={"mt-5"} src={leftImage} width={270} height={270}/>
                    </div>
                    <div className="column has-text-centered">
                        {isMobile ?
                            mobileView():
                            <React.Fragment>
                                <div className={"reverseColumnsFlex"}>
                                    <div className="column">
                                        <img src={rightImage} width={270} height={270}/>
                                    </div>
                                    <div className="column">
                                        <p className="is-size-4 has-text-weight-medium" style={{"color": "#383350"}}>Find experts from
                                            all over</p>
                                        <p className="is-size-4 has-text-weight-medium" style={{"color": "#383350"}}>the world & share
                                            your culture!</p>
                                        <p className="is-size-6 has-text-weight-medium mt-2" style={{"color": "#7060E1"}}>Receive help
                                            from enthusiastic</p>
                                        <p className="is-size-6 has-text-weight-medium" style={{"color": "#7060E1"}}>travelers, provide
                                            accommodation and</p>
                                        <p className="is-size-6 has-text-weight-medium" style={{"color": "#7060E1"}}>share your
                                            culture!</p>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
                <div className={"is-flex is-justify-content-center mt-6"}>
                    <div>
                        <p className="is-size-5 has-text-weight-bold" style={{"color": "#383350"}}>Are you up for a new
                            adventure?</p>
                        <p className={"control"}>
                            <button className={"button has-text-white is-fullwidth background-linear-land"}
                            onClick={()=>scrollToSection()}>I am in!
                            </button>
                        </p>
                        <div className={"is-flex is-justify-content-center mt-3"}>
                            <img src={media} width={200} height={200}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section"
                     style={{"background": "rgba(182, 255, 251, 0.05)"}}>
                <div className="container has-text-centered">
                    <p className="is-size-3 has-text-weight-bold has-text-dark">How it works</p>
                    <div className={"is-flex is-justify-content-center mt-6"}>
                        <a className={"button is-primary " + (selectedTab == "TRAVELERS" ? 'is-underlined' : 'is-inverted')}
                           onClick={() => setSelectedTab("TRAVELERS")}>Travelers</a>
                        <a className={"button is-primary " + (selectedTab == "HOSTS" ? 'is-underlined' : 'is-inverted')}
                           onClick={() => setSelectedTab("HOSTS")}>Hosts</a>
                    </div>
                </div>
                {selectedTab == "HOSTS" ?
                    <HostStepsSection/> : <TravelerStepsSection/>
                }
            </section>
            <section className={"mt-6"} id={"forms"}>
                <div className={"columns is-centered mt-6"}>
                    <div className={"column is-paddingless"}/>
                    <div style={{backgroundColor:'rgba(136, 112, 249, 0.05)',
                        position:'relative',
                        borderRadius:'16px',
                        boxShadow:"3px 3px 22px #888888"}}
                        className={"column is-7 is-justify-content-center"}>
                        <img style={{position:'absolute',left:'47%',top:'-5%'}}
                             src={formLogo} width={90} height={90}/>
                        <div className={"is-flex is-justify-content-center mt-6"}>
                            <div><p className="is-size-4 has-text-weight-bold has-text-centered"
                                    style={{"color": "#383350"}}>Fill out the form and</p>
                                <p className="is-size-4 has-text-weight-bold"
                                   style={{"color": "#383350"}}>
                                    get a free subscription for 1 year!</p></div>
                        </div>

                        <div className="container has-text-centered">
                            <div className={"is-flex is-justify-content-center mt-6"}>
                                <a className={"button is-primary " + (selectedSubTab == "TRAVELERS" ? 'is-underlined' : 'is-inverted')}
                                   onClick={() => setSelectedSubTab("TRAVELERS")}>Travelers</a>
                                <a className={"button is-primary " + (selectedSubTab == "HOSTS" ? 'is-underlined' : 'is-inverted')}
                                   onClick={() => setSelectedSubTab("HOSTS")}>Hosts</a>
                            </div>
                        </div>
                        {
                            selectedSubTab == "HOSTS"?
                                <HostSubscriptionComponent/>:<TravelerSubscriptionComponent/>
                        }
                        <p className={"mt-4 has-text-centered"}>The <strong>Number 1
                        </strong> Work and Travel Community is launching soon. Stay Tuned!</p>
                    </div>
                    <div className={"column is-paddingless"}/>
                </div>
            </section>
            <section className={"mt-6"}>
                <GalleryComponent/>
            </section>
        </React.Fragment>
    )
};

export default LandingPage;