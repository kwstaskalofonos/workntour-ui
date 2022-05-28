import React from "react";
import TopMenu from "@src/views/common/TopMenu";
import Footer from "@src/views/common/Footer";
// @ts-ignore
import checkInbox from "@src/assets/checkInboxPng.png";
// @ts-ignore
import checkInboxSvg from "@src/assets/checkInbox.svg";
import Header from "@src/views/common/Header";

const CheckInboxPage:React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <Header/>
            <section className={"section"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-4"}>
                        <div className="field mb-5 has-text-centered mt-6">
                            <h1 className={"title has-text-weight-bold mb-2"}>Check you Inbox</h1>
                            <p className={"is- has-text-weight-normal mt-4"}>
                                Click the link to someone@gmail.com<br/> to sign in.</p>
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