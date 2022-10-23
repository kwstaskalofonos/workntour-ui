import React, {useEffect, useState} from "react";
import TopMenu from "@src/views/common/TopMenu";
import Footer from "@src/views/common/Footer";
// @ts-ignore
import checkInbox from "@src/assets/checkInboxPng.png";
// @ts-ignore
import Header from "@src/views/common/Header";
import {useLocation} from "react-router";


const CheckInboxPage:React.FunctionComponent = () =>{

    const location = useLocation();
    const [email,setEmail] = useState<string>("");

    useEffect(()=>{
        if(location&&location.state){
            // @ts-ignore
            setEmail(location.state.email);
        }
    },[location])

    return(
        <React.Fragment>
            <Header/>
            <section className={"section has-background-primary-light"} style={{minHeight:"82vh"}}>
                <div className={"columns is-centered"}>
                    <div className={"column is-4"}>
                        <div className="field mb-5 has-text-centered mt-6">
                            <h1 className={"title has-text-weight-bold mb-2"}>Check you Inbox</h1>
                            <p className={"is- has-text-weight-normal mt-4"}>
                                Click the link to <strong>{email}</strong> <br/> to sign in.</p>
                        </div>
                        <div className={"is-flex is-justify-content-center"}>
                            <figure className={"image is-expanded is-fullwidth"}>
                                <img src={checkInbox}/>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
};

export default CheckInboxPage;