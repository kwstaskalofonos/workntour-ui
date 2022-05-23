import React from "react"
import TopMenu from "./common/TopMenu";
import mainSection from "../assets/mainBanner.png";
import conWithHosts from "../assets/connectWithHosts.png";
import joinTheCom from "../assets/joinTheCommunity.png";
import liveLikeALocal from "../assets/liveLikeALocal.png";
import review from "../assets/review.png";
import one from "../assets/Group1.png";
import two from "../assets/Group2.png";
import three from "../assets/Group3.png";
import four from "../assets/Group4.png";
import backgroundImage from "../assets/backgroundLand.png";
import vector from "../assets/Vector.png";
import iphone from "../assets/iPhone 12.png";
import macBookAir from "../assets/MacbookAir.png";

export const LandingPage: React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <div className="columns mb-0" style={{"boxShadow":"0px 4px 18px rgba(0, 0, 0, 0.15)"}}>
                <div className="column container is-max-desktop">
                    <TopMenu/>
                </div>
            </div>
            <section className="section" style={{"background":"rgba(185, 179, 223, 0.1)"}}>
                <div className="container is-align-items-end">
                    <div className="columns is-vcentered">
                        <div className="column is-7 has-text-center">
                            <p className="is-size-2 has-text-weight-bold mb-4" style={{"color":"#6455BB"}}>Work. Travel. Connect.</p>
                            <p className="is-size-4 has-text-weight-medium" style={{"color":"#03D0BC"}}>Workntour is a platform that promotes working</p>
                            <p className="is-size-4 has-text-weight-medium mb-4" style={{"color":"#03D0BC"}}>holidays in Creece!</p>
                            <p className="is-size-5 has-text-weight-normal" style={{"color":"#8B9389","opacity":"0.7"}}>The travelers work for a fiew hours a day in exchange for food</p>
                            <p className="is-size-5 has-text-weight-normal" style={{"color":"#8B9389","opacity":"0.7"}}>and accomodation, while the hosts make use of their skills and</p>
                            <p className="is-size-5 has-text-weight-normal mb-6" style={{"color":"#8B9389","opacity":"0.7"}}>time during their stay.</p>
                            <button className="button is-info has-text-dark">Learn More</button>
                        </div>
                        <div className="column is-5 has-text-right">
                            <img src={mainSection} width="487" height="384.96"/>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section"  style={{"background":"rgba(182, 255, 251, 0.1)"}}>
                <div className="container has-text-centered">
                    <p className="is-size-3 has-text-weight-bold has-text-dark">How it works</p>

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
                </div>
            </section>
            {/*<section className="section px-0 pb-0" style={{"backgroundImage":"url("+backgroundImage+")",backgroundRepeat:"no-repeat"}}>*/}
            {/*    <div className={"columns is-vcentered pd-2"} style={{"backgroundImage":"url("+vector+")",backgroundRepeat:"no-repeat",backgroundSize:"contain",backgroundPosition:"bottom"}}>*/}
            {/*        <div className={"column"}><img className={"is-pulled-right mr-6"} src={iphone} width={400} height={172.74}/></div>*/}
            {/*        <div className={"column"}><img src={macBookAir} width={500} height={172.74}/></div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <section className={"section px-0"}>
                <div className={"container is-max-desktop has-text-centered mt-5"}>
                    <h1 className="title">Say hello to us</h1>
                    <h2 className="subtitle mt-3">Get on the list of hosts and travelers</h2>
                    <div className={"columns"}>
                        <div className={"column is-half is-offset-one-quarter"}>
                            <div className="field is-grouped">
                                <p className="control is-expanded mr-1">
                                    <input className="input" type="text" placeholder="Please type your email here..."/>
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
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>© Copyright work n' tour 2022. All Rights Reserved
                    </p>
                </div>
            </footer>
        </React.Fragment>
    )
};

export default LandingPage;