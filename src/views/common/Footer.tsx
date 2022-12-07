import React from "react";
// @ts-ignore
import logo from "@src/assets/Frame.svg";
// @ts-ignore
import capsuleTlogo from "@src/assets/newLandingPage/CapsuleTlogo.png";
// @ts-ignore
import msStartups from "@src/assets/newLandingPage/MSStartups.png";
// @ts-ignore
import facebook from "@src/assets/newLandingPage/facebook.svg";
// @ts-ignore
import instagram from "@src/assets/newLandingPage/instagram.svg";
// @ts-ignore
import linkdin from "@src/assets/newLandingPage/linkdin.svg";
// @ts-ignore
import twitter from "@src/assets/newLandingPage/twitter.svg";
// @ts-ignore
import reddit from "@src/assets/newLandingPage/reddit.svg";
// @ts-ignore
import msg from "@src/assets/newLandingPage/msg.svg";
// @ts-ignore
import tel from "@src/assets/newLandingPage/tel.svg";
// @ts-ignore
import pin from "@src/assets/newLandingPage/pin.svg";

import {isMobile} from 'react-device-detect';


const Footer:React.FunctionComponent = () =>{

    return(
        <footer className="footer has-background-white p-0ç">
            <hr style={{borderImage:"linear-gradient(90deg,#7E6FD8,#0EE5D0) 30", borderWidth: "4px", borderStyle: "solid", marginTop: 0 }}/>
            <div className={"columns is-centered"}>
                <div className={"column is-three-quarters"}>
                    <div className={isMobile ? "columns is-full is-centered is-vcentered" :"is-flex is-justify-content-space-between"}>
                       <div className={isMobile ? "column is-narrow has-text-centered" : ""}>
                            <img src={logo} width={"90%"} height={"90%"}/>
                            <div>
                                <img src={facebook} width={40} height={40}/>
                                <img src={instagram} width={40} height={40}/>
                                <img src={twitter} width={40} height={40}/>
                                <img src={linkdin} width={40} height={40}/>
                                <img src={reddit} width={40} height={40}/>
                            </div>
                        </div>
                        <div className={isMobile ? "column is-narrow has-text-centered" : ""}>
                            <p className={"is-size-4 has-text-weight-bold"} style={{color:"#4242A4"}}>Contact Info</p>
                            <p className={"is-size-7 has-text-primary"}><span><img src={msg} width={12} height={12}/></span>&nbsp;&nbsp;Email: <a href = "mailto: info@workntour.com">info@workntour.com</a></p>
                            <p className={"is-size-7 has-text-primary"}><span><img src={tel} width={12} height={12}/></span>&nbsp;&nbsp;Phone: <a href="tel:+306986625831">+30 6986625831</a></p>
                            <p className={"is-size-7 has-text-primary"}><span><img src={pin} width={12} height={12}/></span>&nbsp;&nbsp;Athens, Greece</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"columns is-centered"}>
                <div className={"column is-9"}>
                    <hr className={"mt-6"} style={{"border": "1px solid #14C3AD"}}/>
                </div>
            </div>
            <div className={"columns is-centered"}>
                <div className={"column is-three-quarters"}>
                    <div className={isMobile ? "columns is-full is-centered is-vcentered" :"is-flex is-justify-content-space-between"}>
                        <div className={isMobile ? "column is-narrow has-text-centered" : ""}>
                            <p>© Copyright Workntour 2022.&nbsp; </p>
                        </div>
                        <div className={isMobile ? "column is-narrow has-text-centered " : "is-flex"}>
                            <p className={"has-text-weight-bold m-3"}>Supported by: &nbsp;&nbsp;</p>
                            <img src={capsuleTlogo} width={140} height={40}/>
                            <img src={msStartups} width={140} height={40}/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;