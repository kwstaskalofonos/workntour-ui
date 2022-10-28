import React, {useEffect, useRef, useState} from 'react'
import InterCom from "@src/views/common/InterCom";
import Header from "@src/views/common/Header";
import {isMobile} from 'react-device-detect';
// @ts-ignore
import plane from "@src/assets/newLandingPage/icon-airplane.svg";
// @ts-ignore
import kart from "@src/assets/newLandingPage/icon-kart.svg";
// @ts-ignore
import rocket from "@src/assets/newLandingPage/icon-rocket.svg";
// @ts-ignore
import woman from "@src/assets/newLandingPage/icon-woman.svg";
// @ts-ignore
import life from "@src/assets/newLandingPage/lifePn.png";
// @ts-ignore
import about1 from "@src/assets/newLandingPage/about-1.png";
// @ts-ignore
import about2 from "@src/assets/newLandingPage/about-2.png";
// @ts-ignore
import about21 from "@src/assets/newLandingPage/about2-1.png";
// @ts-ignore
import about22 from "@src/assets/newLandingPage/about2-2.png";
// @ts-ignore
import about23 from "@src/assets/newLandingPage/about2-3.png";
// @ts-ignore
import raf from "@src/assets/newLandingPage/rafail.png";
// @ts-ignore
import thanasis from "@src/assets/newLandingPage/thanasis.png";
// @ts-ignore
import kostas from "@src/assets/newLandingPage/kwstas.png";
// @ts-ignore
import chris from "@src/assets/newLandingPage/chris.png";
import Footer from "@src/views/common/Footer";
import PersonDescr from "@src/views/PersonDescr";
import {logEvent} from "firebase/analytics";
import {analytics} from "@src/utilities/firebase";

const AboutPage:React.FunctionComponent = () =>{


    useEffect(()=>{
        logEvent(analytics, 'about_page',{
           content_type:'string'
        });
    },[])

    const chrisDesc = () =>{
        return(
            <p className={"is-size-7 is-flex has-text-centered"}>Christos holds a degree in<br/>
                Informatics from Athens<br/>University of Economics &<br/>Business. His role on the<br/>
                workntour team is to set the<br/>technical direction for the product development. Christos<br/>
                specializes in Mobile App<br/>Development and has<br/>experience working for tech
                <br/>companies and startups in<br/>Greece</p>
        )
    }

    const rafDesc = () =>{
        return(
            <p className={"is-size-7 is-flex has-text-centered"}>Rafail holds a Bachelor's degree in Law<br/>
            from Maastricht University and a Master's Degree<br/>in Maritime from the Erasmus University of <br/>
            Rotterdam, with specialization in <br/>Yacht Management. At Workntour he <br/>is responsible for setting out the<br/>
            team's goal and carrying out business<br/>development strategies. Rafail has<br/>already set up a company in Yachting.</p>
        )
    }

    const thanDesc = () =>{
        return(
            <p className={"is-size-7 is-flex has-text-centered"}>Thanasis holds a degree in Computer Engineering<br/>
            and Informatics from University of Patras<br/>and follows a Master's degree in Business Administration from<br/>
            University of Pafos. He has experience as<br/>Software Engineer in Consulting companies.<br/>
            In Workntout, hae has taken over the backend implementation<br/>of the Web and Mobile application and is responsible for<br/>
            overseeing the Company's Operation.</p>
        )
    }

    const kostasDesc = () =>{
        return(
            <p className={"is-size-7 is-flex has-text-centered"}>Konstantinos holds a degree in Computer Science<br/>
            from Athens University of Economics and Business<br/>He has experience as Full Stack Developer in software companies.
            <br/>In Workntour he is responsible for the frontend implementation of the Web Application using React.</p>
        )
    }

    return(
        <React.Fragment>
            <InterCom/>
            <Header/>
            <section className={"section about-page-top-background"}>
                <div className={"columns mt-5"}>
                    <div  className={"column is-2"}/>
                    <div className={"column"}>
                        <p style={{position:'relative'}}
                            className={"has-text-primary is-size-4 has-text-weight-semibold"}>
                            <strong style={{color:"#534496"}}>L</strong>ove for traveling
                        <img style={{position:'absolute',top:'13px'}}
                            src={plane} width={20} height={20}/>
                        </p>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className={"column"}>
                        <p style={{position:'relative'}}
                            className={"has-text-info is-size-4 has-text-weight-semibold"}>
                            <strong style={{color:"#1E7267"}}>I</strong>nnovation seekers
                            <img style={{position:'absolute',top:'10px'}}
                                 src={rocket} width={20} height={20}/>
                        </p>
                    </div>
                </div>
                <div className={"columns is-centered"}>
                    <div className={"column is-three-quarters has-text-centered"}>
                            <img src={life} width={"55%"} height={10}/>
                    </div>
                </div>
                <div className={"columns mt-5"}>
                    <div className={"column is-2"}/>
                    <div className={"column"}>
                        <p style={{position:'relative'}}
                           className={"has-text-primary is-size-4 has-text-weight-semibold"}>
                            <strong style={{color:"#534496"}}>F</strong>riendship oriented
                            <img style={{position:'absolute',top:'13px'}}
                                 src={woman} width={20} height={20}/>
                            <img style={{position:'absolute',top:'13px', left:"233px"}}
                                 src={woman} width={20} height={20}/>
                        </p>
                    </div>
                    <div className={"column is-1"}></div>
                    <div className={"column"}>
                        <p style={{position:'relative'}}
                           className={"has-text-info is-size-4 has-text-weight-semibold"}>
                            <strong style={{color:"#1E7267"}}>E</strong>xperience driven
                            <img style={{position:'absolute',top:'10px'}}
                                 src={kart} width={20} height={20}/>
                        </p>
                    </div>
                </div>
            </section>
            <section className={"section"}>
                <div className={"columns is-centered is-vcentered"}>
                    <div className={"column is-4"}>
                        <p style={{color:"#383350"}} className={"is-size-3 has-text-weight-semibold"}>
                            What is Workntour</p>
                        <p style={{color:"#383350"}} className={"is-size-6 mt-5"}>
                            Workntour is an Online Marketplace that aims to
                            <br/>revolutionize Tourism by connecting tourists and local<br/>
                            communities, allowing travelers to offer their time,<br/>
                            skills and expertise in exchange for accommodation<br/>on board</p>
                    </div>
                    <div className={"column is-4"}>
                        <img src={about1}/>
                    </div>
                </div>

                <div className={"columns is-centered is-vcentered"}>
                    <div className={"column is-4"}>
                        <img src={about2}/>
                    </div>
                    <div className={"column is-4"}>
                        <p style={{color:"#383350"}} className={"is-size-6 mt-5"}>
                            We help host find affordable assistance is a variety of fields.</p>
                        <p style={{color:"#383350"}} className={"is-size-6 mt-5"}>
                            We help travelers can cover their needs when traveling for longer periods of time.</p>
                        <p style={{color:"#383350"}} className={"is-size-6 mt-5"}>
                            We want remote areas and local communities to be able to attract more tourists.</p>
                        <p style={{color:"#383350"}} className={"is-size-6 mt-5"}>
                            Workntour seeks to encourage personal and professional development by making travel accessible
                         to all, to promote the Collaborative Economy, the exchange of Cultures and the "Live like a local"
                        mentality</p>
                    </div>
                </div>
            </section>

            <section style={{backgroundColor:"rgba(182, 255, 251, 0.14)"}}>
                <section className={"section"}>
                    <div className={"columns is-centered mt-5"}>
                        <div className={"column is-two-thirds"}>
                            <div style={{position:'relative'}}>
                                <div className={"box"}>
                                    <div className={"columns"}>
                                        <div className={"column"}>
                                            <p className={"is-size-2 has-text-weight-semibold"}
                                               style={{color:"rgba(224, 220, 255, 1)"}}>Why</p>
                                            <div style={{height:"3px",width:"90px"}}
                                                 className={"background-linear container ml-0"}/>
                                            <p className={"is-size-6 has-text-weight-semibold mt-3"}>
                                                Because we believe that exploring the world while sharing<br/>
                                                your skills and culture with local communities is the ultimate<br/>
                                                key to happiness!
                                            </p>
                                            {isMobile &&
                                                <img src={about23} width={200} height={100}/>
                                            }
                                        </div>
                                        <div className={"column is-4"}/>
                                    </div>
                                </div>
                                {!isMobile &&
                                    <img style={{position:'absolute',left:'70%',top:'-37%'}} src={about23} width={200} height={100}/>
                                }
                            </div>

                            <div style={{position:'relative'}} className={"mt-6"}>
                                <div className={"box"}>
                                    <div className={"columns"}>
                                        <div className={"column is-5"}/>
                                        <div className={"column"}>
                                            <p className={"is-size-2 has-text-weight-semibold"}
                                               style={{color:"rgba(224, 220, 255, 1)"}}>How</p>
                                            <div style={{height:"3px",width:"90px"}}
                                                 className={"background-linear container ml-0"}/>
                                            <p className={"is-size-6 has-text-weight-semibold mt-3"}>
                                                We connect travelers with local communities so that tourists can<br/>
                                                offer their skills for a few hours a day, in exchange for<br/>
                                                accommodation and board.
                                            </p>
                                            {isMobile &&
                                                <img src={about22} width={200} height={100}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {!isMobile &&
                                    <img style={{position:'absolute',left:'2%',top:'7%'}} src={about22} width={200} height={100}/>
                                }
                            </div>

                            <div style={{position:'relative'}} className={"mt-6"}>
                                <div className={"box"}>
                                    <div className={"columns"}>
                                        <div className={"column"}>
                                            <p className={"is-size-2 has-text-weight-semibold"}
                                               style={{color:"rgba(224, 220, 255, 1)"}}>What</p>
                                            <div style={{height:"3px",width:"90px"}}
                                                 className={"background-linear container ml-0"}/>
                                            <p className={"is-size-6 has-text-weight-semibold mt-3"}>
                                                Our online marketplace will allow travelers to contact the hosts of<br/>
                                                their choice and offer to work for an agreed amount of time per<br/>
                                                day in exchange for accommodation and board while travelling.
                                            </p>
                                            {isMobile &&
                                                <img src={about21} width={200} height={100}/>
                                            }
                                        </div>
                                        <div className={"column is-4"}/>
                                    </div>
                                </div>
                                {!isMobile &&
                                    <img style={{position:'absolute',left:'70%',top:'-20%'}} src={about21} width={200} height={100}/>
                                }
                            </div>

                        </div>
                    </div>
                </section>

                <section className={"section is-medium about-page-last-background"}>
                    <div className={"is-flex is-justify-content-center mt-5"}>
                        <p className={"has-text-weight-bold is-size-3 pt-6"}>Meet our team</p>
                    </div>

                    <div className={"columns is-centered mt-4"}>
                        <div className={"column is-6"}>
                            <div className={"columns"}>
                                <div className={"column is-4"}>
                                    <PersonDescr key={"member-1"} src={raf} name={"Rafail Roumeliotis"} position={"Co-founder & CEO"} description={rafDesc()}/>
                                </div>
                                <div className={"column is-4"}/>
                                <div className={"column is-4"}>
                                    <PersonDescr key={"member-2"} src={chris} name={"Xristos Petimezas"} position={"Co-founder & CTO"} description={chrisDesc()}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"columns is-centered mt-6"}>
                        <div className={"column is-6"}>
                            <div className={"columns"}>
                                <div className={"column is-4"}>
                                    <PersonDescr key={"member-3"} src={thanasis} name={"Thanasis Bethanis"} position={"Co-founder & COO"} description={thanDesc()}/>
                                </div>
                                <div className={"column is-4"}/>
                                <div className={"column is-4"}>
                                    <PersonDescr key={"member-4"} src={kostas} name={"Konstantinos Kalofonos"} position={"Frontend Developer"} description={kostasDesc()}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </section>

            <hr className={"mt-6"} style={{"border": "1px solid #7E6FD8"}}/>
            <Footer/>
        </React.Fragment>
    )
};

export default AboutPage;