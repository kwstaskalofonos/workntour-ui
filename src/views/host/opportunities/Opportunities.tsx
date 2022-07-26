import React, {useState} from "react";
import {faAdd} from "@fortawesome/free-solid-svg-icons/faAdd";
import {faFileAlt} from "@fortawesome/free-solid-svg-icons/faFileAlt";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import OpportunitiesTab from "@src/views/host/opportunities/OpportunitiesTab";
import AddOpportunityTab from "@src/views/host/opportunities/AddOpportunityTab";

const Opportunities:React.FunctionComponent = () =>{

    const [selectedTab,setSelectedTab] = useState<string>("OPPORTUNITIES");

    return(
        <div className="">
            <div className={"tabs is-toggle is-toggle-rounded is-centered"}>
                <ul>
                    <li className={(selectedTab == "OPPORTUNITIES")?"is-active":''}>
                        <a onClick={()=>setSelectedTab('OPPORTUNITIES')} className={(selectedTab == "OPPORTUNITIES")?"has-background-primary":""}>
                            <span className="icon is-small"><FontAwesomeIcon icon={faFileAlt}/></span>
                            <span>Opportunities</span>
                        </a>
                    </li>
                    <li className={(selectedTab == "ADD_OPPORTUNITIY")?"is-active":''}>
                        <a onClick={()=>setSelectedTab('ADD_OPPORTUNITIY')} className={(selectedTab == "ADD_OPPORTUNITIY")?"has-background-primary":""}>
                            <span className="icon is-small"><FontAwesomeIcon icon={faAdd}/></span>
                            <span>New Opportunity</span>
                        </a>
                    </li>
                </ul>
            </div>
            {selectedTab == "OPPORTUNITIES" ?
                <OpportunitiesTab/>:
                <AddOpportunityTab/>
            }
        </div>
    )
};

export default Opportunities;