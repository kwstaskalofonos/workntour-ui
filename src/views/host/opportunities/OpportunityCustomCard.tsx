import React, {useEffect, useState} from "react";
import {Opportunity, OpportunityCategory} from "@src/state/stores/opportunity/models";
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
        if(opportunity){
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
        if(opportunity){
            const index = Object.values(OpportunityCategory).indexOf(opportunity.opportunityCategory as unknown as OpportunityCategory);
            return Object.keys(OpportunityCategory)[index];
        }
        return '';
    }

    const goToOpportunity = () =>{
        navigate('/opportunity/'+opportunity.opportunityId);
    }

    return(
        <React.Fragment>
                <Slide autoplay={false} transitionDuration={6}
                canSwipe={true} indicators={true}
                       prevArrow={<span className="icon custom-arrow-right is-medium has-background-white"><FontAwesomeIcon icon={faAngleLeft}/></span>}
                        nextArrow={<span className="icon custom-arrow-left is-medium has-background-white"><FontAwesomeIcon icon={faAngleRight}/></span>}>
                    {slideImages.map((slideImage, index)=> (
                        <div className="each-slide-effect" style={{position:"relative",cursor:'pointer'}}
                             key={index} onClick={goToOpportunity}>
                            <div style={{'backgroundImage': `url(${slideImage.url})`,backgroundRepeat:"no-repeat",backgroundPosition:'center'}}>
                            </div>
                            <p
                               className={"is-size-7 has-text-white-bis has-text-weight-semibold"} style={{position:"absolute",bottom:"20px",left:"12px"}}>
                                {opportunity.jobTitle}</p>
                        </div>
                    ))}
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