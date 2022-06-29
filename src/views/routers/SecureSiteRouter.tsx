import React from "react";
import { Role } from "../../state/stores/user/models";
import CompanyRouter from "./CompanyRouter";
import IndividualRouter from "./IndividualRouter";
import TravelerRouter from "./TravelerRouter";
import {getCookie} from "@src/utilities/cookies";

const SecuredSiteRouter: React.FunctionComponent = () =>{

    const userRole:string|undefined = getCookie("role");

    return(
        <React.Fragment>

            {userRole===Role.COMPANY.valueOf() &&
                <CompanyRouter/>
            }
             {userRole==Role.INDIVIDUAL.valueOf() &&
                <IndividualRouter/>
             }
             {userRole===Role.TRAVELER.valueOf() &&
                <TravelerRouter/>
             }
        </React.Fragment>
    )
};

export default SecuredSiteRouter;