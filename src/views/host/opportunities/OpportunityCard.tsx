import React, {useEffect, useState} from "react";
import {Opportunity, OpportunityCategory} from "@src/state/stores/opportunity/models";
import {getDateFromString} from "@src/utilities/ui";
import CustomPagination from "@src/views/common/CustomPagination";
import {getOpportunity} from "@src/state/stores/opportunity/operations";
import {useNavigate} from "react-router";

interface Props{
    img:any,
    opportunity:Opportunity
}

const OpportunityCard:React.FunctionComponent<Props> = ({img,opportunity}) =>{

    const [selectedPage,setSelectedPage] = useState<number>(0);
    const navigate = useNavigate();

    const extractCategory = () =>{
        if(opportunity){
            const index = Object.values(OpportunityCategory).indexOf(opportunity.opportunityCategory as unknown as OpportunityCategory);
            return Object.keys(OpportunityCategory)[index];
        }
        return '';
    }

    const extractLocationInfo = () =>{
        let country = opportunity.opportunityLocation.placemark.country;
        let area = opportunity.opportunityLocation.placemark.area;

        return area+", "+country
    }

    const goToOpportunity = () =>{
        navigate('/opportunity/'+opportunity.opportunityId);
    }

    return(
        <div className="card" style={{cursor:'pointer'}} onClick={goToOpportunity}>
            <div className="card-image">
                <figure className="image is-2by1" >
                    <img src={(opportunity.imageUrls&&opportunity.imageUrls[selectedPage])&&opportunity.imageUrls[selectedPage]}
                    style={{borderBottomRightRadius:'0.25rem',borderBottomLeftRadius:'0.25rem'}}/>
                    {/*<CustomPagination length={opportunity.imageUrls.length}*/}
                    {/*                  selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>*/}
                    <p style={{position:"absolute",bottom:"10px",left:"10px"}}
                    className={"is-size-6 has-text-white-bis"}>{opportunity.jobTitle}</p>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        {/*<p className="title is-5">{opportunity.jobTitle}</p>*/}
                        <p className="is-5 has-text-weight-semibold">{extractLocationInfo()}</p>
                        <p className="is-5 has-text-weight-medium has-text-grey-light">{extractCategory()}</p>
                        <p className="is-6 has-text-weight-normal has-text-grey"><time>
                                {getDateFromString(opportunity.opportunityDates[0].startDate)+"-"
                                    +getDateFromString(opportunity.opportunityDates[0].endDate)}</time></p>
                    </div>
                </div>

            </div>
            <div className="card">
                <footer className="card-footer">
                    {/*<a href="#" className="card-footer-item has-text-primary has-text-weight-semibold">Edit</a>*/}
                    <a className="card-footer-item  has-text-danger has-text-weight-semibold">Delete</a>
                </footer>
            </div>
        </div>
    )
};

export default OpportunityCard;