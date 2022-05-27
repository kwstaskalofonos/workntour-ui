import { Router, Routes } from "react-router-dom";
import React from "react";
import { UserType } from "../../state/stores/user/models";
import CompanyRouter from "./CompanyRouter";
import IndividualRouter from "./IndividualRouter";
import TravelerRouter from "./TravelerRouter";

const SecuredSiteRouter: React.FunctionComponent = () =>{

    const userType:UserType=UserType.COMPANY;

    return(
        <React.Fragment>

            {userType.valueOf()===UserType.COMPANY &&
                <CompanyRouter/>
            }
             {userType.valueOf()==UserType.INIVIDUAL &&
                <IndividualRouter/>
             }
             {userType.valueOf()===UserType.TRAVELER &&
                <TravelerRouter/>
             }
        </React.Fragment>
    )
};

export default SecuredSiteRouter;