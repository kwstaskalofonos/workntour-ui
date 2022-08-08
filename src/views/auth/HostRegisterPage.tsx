import React, {useState} from "react";
import Header from "@src/views/common/Header";
import Footer from "@src/views/common/Footer";
import IndividualRegisterTab from "@src/views/auth/IndividualRegisterTab";
import CompanyRegisterTab from "@src/views/auth/CompanyRegisterTab";
// @ts-ignore
import illustration from "@src/assets/signUpAsHost.svg";
import InterCom from "@src/views/common/InterCom";

const HostRegisterPage:React.FunctionComponent = () =>{

    const [selectedTab,setSelectedTab] = useState<string>('INDIVIDUAL');

    return(
        <React.Fragment>
            <InterCom/>
            <Header/>
            <section className={"section has-background-primary-light"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-1"}/>
                    <div className={"column is-3"}>
                        <div className={"field mb-5"}>
                            <h1 className={"title has-text-weight-bold has-text-primary"}>Hello!</h1>
                            <h2 className={"subtitle has-text-weight-bold has-text-info"}>
                                Sign up as a host and share your culture!</h2>
                        </div>
                        <div className="tabs is-centered is-medium">
                            <ul>
                                <li className={(selectedTab=='INDIVIDUAL'?"is-active":'')}
                                    onClick={()=>setSelectedTab("INDIVIDUAL")}>
                                    <a className={"has-text-primary has-text-weight-semibold"}>Individual</a></li>
                                <li className={(selectedTab=='COMPANY'?"is-active":'')}
                                    onClick={()=>setSelectedTab("COMPANY")}>
                                    <a className={"has-text-primary has-text-weight-semibold"}>Company</a></li>
                            </ul>
                        </div>
                        {/*<div className={"is-flex"}>*/}
                        {/*    <div className="field">*/}
                        {/*        <input className="is-checkradio is-circle has-background-color" id="individual"*/}
                        {/*               type="checkbox" name="individual"/>*/}
                        {/*            <label htmlFor="individual">Checkbox</label>*/}
                        {/*    </div>*/}
                        {/*    <div className="field">*/}
                        {/*        <input className="is-checkradio is-circle" id="company"*/}
                        {/*               type="checkbox" name="company"/>*/}
                        {/*        <label htmlFor="company">Checkbox</label>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {(selectedTab=='INDIVIDUAL') &&
                            <IndividualRegisterTab/>
                        }
                        {(selectedTab=='COMPANY') &&
                            <CompanyRegisterTab/>
                        }

                    </div>
                    <div className={"column is-2"}/>
                    <div className={"column is-4"}>
                        <figure className={"image is-4by5"}>
                            <img src={illustration}/>
                        </figure>
                    </div>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
};

export default HostRegisterPage;