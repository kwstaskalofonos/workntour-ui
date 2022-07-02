import React from "react";
import { Role } from "@src/state/stores/user/models";
import CompanyRouter from "./CompanyRouter";
import IndividualRouter from "./IndividualRouter";
import TravelerRouter from "./TravelerRouter";
import {getCookie} from "@src/utilities/cookies";
import Header from "@src/views/common/Header";
import Footer from "@src/views/common/Footer";

const SecuredSiteRouter: React.FunctionComponent = () =>{

    const userRole:string|undefined = getCookie("role");

    return(
        <React.Fragment>
            <Header/>
                {userRole===Role.COMPANY.valueOf() &&
                    <CompanyRouter/>
                }
                {userRole===Role.INDIVIDUAL.valueOf() &&
                    <IndividualRouter/>
                }
                {userRole===Role.TRAVELER.valueOf() &&
                    <TravelerRouter/>
                }
            <Footer/>
        </React.Fragment>
    )
};

export default SecuredSiteRouter;