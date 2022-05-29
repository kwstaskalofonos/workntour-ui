import React, {useState} from "react";
import Header from "@src/views/common/Header";
import Footer from "@src/views/common/Footer";
import IndividualRegisterTab from "@src/views/auth/IndividualRegisterTab";
import CompanyRegisterTab from "@src/views/auth/CompanyRegisterTab";

const HostRegisterPage:React.FunctionComponent = () =>{

    const [selectedTab,setSelectedTab] = useState<string>('INDIVIDUAL');

    return(
        <React.Fragment>
            <Header/>
            <section className={"section"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-3"}>
                        <div className={"field mb-6 has-text-centered"}>
                            <h1 className={"title has-text-weight-bold"}>Hello!</h1>
                            <h2 className={"subtitle has-text-weight-bold has-text-primary"}>
                                Sign up as a host and <br/>share your culture!</h2>
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
                        {(selectedTab=='INDIVIDUAL') &&
                            <IndividualRegisterTab/>
                        }
                        {(selectedTab=='COMPANY') &&
                            <CompanyRegisterTab/>
                        }

                    </div>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
};

export default HostRegisterPage;