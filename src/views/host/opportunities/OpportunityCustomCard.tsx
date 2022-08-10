import React, {useEffect, useState} from "react";
import {Opportunity, OpportunityCategory, OpportunityCategoryType} from "@src/state/stores/opportunity/models";
import {Slide} from "react-slideshow-image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons/faAngleRight";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {getDateFromString} from "@src/utilities/ui";
import {useNavigate} from "react-router";

interface Props{
    img:any,
    opportunity:Opportunity,
    setOpportunityToDelete:any
}

const OpportunityCustomCard:React.FunctionComponent<Props> = ({img,opportunity,setOpportunityToDelete}) =>{

    const [slideImages,setSlideImages] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(opportunity&&opportunity.imageUrls.length>0){
            let tmp:any[]=[];
            for(let imageUrl of opportunity.imageUrls){
                tmp.push({url:imageUrl,caption:""});
            }
            setSlideImages(tmp);
        }
    },[opportunity])

    const extractLocationInfo = () =>{
        let country = opportunity.opportunityLocation.placemark.country;
        let area = opportunity.opportunityLocation.placemark.area;

        return area+", "+country
    }

    const extractCategory = () =>{
        if(opportunity&&opportunity.opportunityCategory){
            return OpportunityCategory[opportunity.opportunityCategory as unknown as OpportunityCategoryType];
        }
        return '';
    }

    const goToOpportunity = () =>{
        navigate('/opportunity/'+opportunity.opportunityId);
    }

    const renderFrontImage = () =>{
        if(slideImages&&slideImages.length>0){
            return(
                <div className="each-slide-effect" style={{position:"relative",cursor:'pointer'}}
                     key={"slide-opportunity-image-"+slideImages[0].url} onClick={goToOpportunity}>
                    <div style={{'backgroundImage': `url(${slideImages[0].url})`,backgroundRepeat:"no-repeat",backgroundPosition:'center'}}>
                    </div>
                    <p
                        className={"is-size-7 has-text-white-bis has-text-weight-semibold"} style={{position:"absolute",bottom:"20px",left:"12px"}}>
                        {opportunity.jobTitle}</p>
                </div>
            )
        }
        return ;
    }

    return(
        <React.Fragment>
                <Slide autoplay={false} transitionDuration={6}
                canSwipe={false} indicators={false} arrows={false}>
                    {renderFrontImage()}
                </Slide>
            <p className="is-size-7 has-text-weight-bold">{extractLocationInfo()}</p>
            <p className="is-size-7 has-text-grey-light has-text-weight-bold">{extractCategory()}</p>
            <p className="is-size-7 has-text-weight-normal has-text-grey"><time>
                {getDateFromString(opportunity.opportunityDates[0].startDate)+"-"
                    +getDateFromString(opportunity.opportunityDates[0].endDate)}</time></p>
        </React.Fragment>
    )
};

export default OpportunityCustomCard;