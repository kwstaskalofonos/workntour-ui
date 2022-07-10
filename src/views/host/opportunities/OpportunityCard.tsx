import React from "react";
import {Opportunity} from "@src/state/stores/opportunity/models";
import {getDateFromString} from "@src/utilities/ui";

interface Props{
    img:any,
    opportunity:Opportunity
}

const OpportunityCard:React.FunctionComponent<Props> = ({img,opportunity}) =>{

    return(
        <div className="card">
            <header className="card-header has-background-grey-lighter">
            </header>
            <div className="card-image">
                <figure className="image is-2by1">
                    <img src={img} alt="Placeholder image"/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-5">{opportunity.jobTitle}</p>
                        <p className="subtitle is-5">{opportunity.opportunityCategory}</p>
                    </div>
                </div>

                <div className="content">
                    {opportunity.jobDescription}
                    <br/>
                        <time dateTime="2016-1-1">
                            {getDateFromString(opportunity.opportunityDates[0].startDate)+"-"
                            +getDateFromString(opportunity.opportunityDates[0].endDate)}</time>
                </div>

            </div>
            <div className="card">
                <footer className="card-footer">
                    <a href="#" className="card-footer-item has-text-primary has-text-weight-semibold">Edit</a>
                    <a className="card-footer-item has-text-danger has-text-weight-semibold">Delete</a>
                </footer>
            </div>
        </div>
    )
};

export default OpportunityCard;