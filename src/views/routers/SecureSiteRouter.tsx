import { Router, Routes } from "react-router-dom";
import React from "react";
import { UserType } from "../../state/stores/user/models";
import CompanyRouter from "./CompanyRouter";
import IndividualRouter from "./IndividualRouter";
import TravelerRouter from "./TravelerRouter";
import {getCookie} from "@src/utilities/cookies";

const SecuredSiteRouter: React.FunctionComponent = () =>{

    const userRole:string|undefined = getCookie("role");

    return(
        <React.Fragment>

            {userRole===UserType.COMPANY.valueOf() &&
                <CompanyRouter/>
            }
             {userRole==UserType.INDIVIDUAL.valueOf() &&
                <IndividualRouter/>
             }
             {userRole===UserType.TRAVELER.valueOf() &&
                <TravelerRouter/>
             }
        </React.Fragment>
    )
};

export default SecuredSiteRouter;