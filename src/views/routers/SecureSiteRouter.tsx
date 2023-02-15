import React from "react";
import { Role } from "@src/state/stores/user/models";
import CompanyRouter from "./CompanyRouter";
import IndividualRouter from "./IndividualRouter";
import TravelerRouter from "./TravelerRouter";
import {getCookie} from "@src/utilities/cookies";
import Header from "@src/views/common/Header";
import Footer from "@src/views/common/Footer";
import InterCom from "@src/views/common/InterCom";

const SecuredSiteRouter: React.FunctionComponent = () =>{

    const userRole:string|undefined = getCookie("role");

    return(
        <React.Fragment>
            <InterCom/>
            <div className="container is-fluid mt-4 mb-4">
                {userRole===Role.COMPANY_HOST.valueOf() &&
                    <CompanyRouter/>
                }
                {userRole===Role.INDIVIDUAL_HOST.valueOf() &&
                    <IndividualRouter/>
                }
                {userRole===Role.TRAVELER.valueOf() &&
                    <TravelerRouter/>
                }
            </div>
        </React.Fragment>
    )
};

export default SecuredSiteRouter;