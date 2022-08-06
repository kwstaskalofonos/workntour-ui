import React, {useEffect, useState} from "react";
import {deleteOpportunity, getOpportunity} from "@src/state/stores/opportunity/operations";
import {
    Accommodation, Languages, LearningOpportunities,
    Meal,
    Opportunity,
    TypeOfHelpNeeded
} from "@src/state/stores/opportunity/models";
import {useParams} from "react-router";
import {getDateFromString} from "@src/utilities/ui";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import cloneDeep from 'lodash/cloneDeep';
import GenericModal from "@src/views/common/GenericModal";
import BookModal from "@src/views/traveler/home/BookModal";

interface Props{
    hostMode:boolean
}

const Opportunity:React.FunctionComponent<Props> = ({hostMode}) =>{

    const {id} = useParams();
    const [opportunity,setOpportunity] = useState<Opportunity>();
    const [location,setLocation] = useState({lat:0,lng:0});
    const [isActiveDelModal,setIsActiveDelModal] = useState<boolean>(false);
    const [isActiveBookModal,setIsActiveBookModal] = useState<boolean>(false);

    useEffect(()=>{
        if(id){
            getOpportunity(id)
                .then((response)=>{
                    //@ts-ignore
                    setOpportunity(response);
                })
        }
    },[id])

    useEffect(()=>{
        if(opportunity){
            let tmp = cloneDeep(location);
            tmp.lat = Number(opportunity.opportunityLocation.latitude);
            tmp.lng = Number(opportunity.opportunityLocation.longitude)
            setLocation(tmp);
        }
    },[opportunity])

    const renderImages = () =>{
        let array:any[]=[];
        opportunity?.imageUrls.forEach((value,index) => {
            array.push(<div className={"column is-one-third"}>
                <figure className={"image is-square"}>
                    <img key={"image-"+index+1} src={value}
                    style={{borderTopLeftRadius:'1.6rem',borderTopRightRadius:'1.6rem',
                    borderBottomLeftRadius:'1.6rem',borderBottomRightRadius:'1.6rem'}}/>
                </figure>
            </div>)
        })
        return array;
    }

    const constructAddress = () =>{
        let area = opportunity?.opportunityLocation.placemark.area;
        let locality = opportunity?.opportunityLocation.placemark.locality;
        let country = opportunity?.opportunityLocation.placemark.country;
        let postalCode = opportunity?.opportunityLocation.placemark.postalCode;

        return area+", "+locality+", "+country+", "+postalCode
    }

    const constructHelpNeeded = () =>{
        let helpNeeded = '';
        let counter=1;
        if(opportunity?.typeOfHelpNeeded){
            for(let help of opportunity?.typeOfHelpNeeded){
                // @ts-ignore
                helpNeeded = helpNeeded+TypeOfHelpNeeded[help]+((counter==opportunity?.typeOfHelpNeeded.length)?"":', ');
                counter = counter+1;
            }
        }
        return helpNeeded;
    }

    const constructMeals = () =>{
        let mealsProvided = '';
        let counter=1;
        if(opportunity?.meals){
            for(let meal of opportunity?.meals){
                // @ts-ignore
                mealsProvided = mealsProvided+Meal[meal]+((counter==opportunity?.meals.length)?"":', ');
                counter = counter+1;
            }
        }
        return mealsProvided;
    }

    const constructLangRequired = () =>{
        let languages = '';
        let counter=1;
        if(opportunity?.languagesRequired){
            for(let language of opportunity?.languagesRequired){
                // @ts-ignore
                languages = languages+Languages[language]+((counter==opportunity?.languagesRequired.length)?"":', ');
                counter = counter+1;
            }
        }
        return languages;
    }

    const constructLangSpoken = () =>{
        let languages = '';
        let counter=1;
        if(opportunity?.languagesSpoken){
            for(let language of opportunity?.languagesSpoken){
                // @ts-ignore
                languages = languages+Languages[language]+((counter==opportunity?.languagesSpoken.length)?"":', ');
                counter = counter+1;
            }
        }
        return languages;
    }

    const constructLearningOpps = () =>{
        let learningOpps = '';
        let counter=1;
        if(opportunity?.learningOpportunities){
            for(let learningOpp of opportunity?.learningOpportunities){
                // @ts-ignore
                learningOpps = learningOpps+LearningOpportunities[learningOpp]+((counter==opportunity?.learningOpportunities.length)?"":', ');
                counter = counter+1;
            }
        }
        return learningOpps;
    }

    const extractAccommodation = () =>{
        if(opportunity&&opportunity.accommodationProvided){
            // @ts-ignore
            return Accommodation[opportunity?.accommodationProvided];
        }
    }

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const delOpportunity = () =>{
        if(opportunity){
            deleteOpportunity(opportunity?.opportunityId)
                .then((response)=>{
                    window.location.replace("/opportunities");
                });
        }
    }

    const onCloseModal = () =>{
        setIsActiveDelModal(false);
    }

    return(
        <React.Fragment>
            {/*<div style={{maxHeight:"200px"}}>*/}
            {/*    <CustomImageGallery imagesUrls={(opportunity?.imageUrls)&&opportunity?.imageUrls}/>*/}
            {/*</div>*/}
            <div className={"columns is-centered"}>
                <div className={"column is-5"}>
                    <p className={"title is-4"}>{opportunity?.jobTitle}</p>
                    <p className={"subtitle is-5"}>{constructAddress()}</p>
                    <div className={"columns is-multiline"}>
                        {renderImages()}
                    </div>
                    <hr/>
                    <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Type of help needed</p>
                    <p className={"has-text-weight-semibold is-size-6"}>{constructHelpNeeded()}</p>
                    <hr/>
                    <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Accommodation provided</p>
                    <p className={"has-text-weight-semibold is-size-6"}>{extractAccommodation()}</p>
                    <hr/>
                    <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Meals provided</p>
                    <p className={"has-text-weight-semibold is-size-6"}>{constructMeals()}</p>
                    <hr/>
                    <div className={"is-flex is-justify-content-space-between"}>
                        <div>
                            <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Stay at least</p>
                            <p className={"has-text-weight-semibold is-size-4"}>{opportunity?.minimumDays+" days"}</p>
                        </div>
                        <div>
                            <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Stay up to</p>
                            <p className={"has-text-weight-semibold is-size-4"}>{opportunity?.maximumDays+" days"}</p>
                        </div>
                    </div>
                </div>
                <div className={"column is-1"}></div>
                <div className={"column is-5"}>
                    <LoadScript
                        // @ts-ignore
                        googleMapsApiKey={__API_KEY__}
                        libraries={["places"]}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            zoom={10}
                            center={location&&location}>
                            <Marker position={location&&location}/>
                        </GoogleMap>
                    </LoadScript>
                    <hr/>
                    <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Languages required</p>
                    <p className={"has-text-weight-semibold is-size-6"}>{constructLangRequired()}</p>
                    <hr/>
                    <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Languages spoken</p>
                    <p className={"has-text-weight-semibold is-size-6"}>{constructLangSpoken()}</p>
                    <hr/>
                    <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Learning Opportunities</p>
                    <p className={"has-text-weight-semibold is-size-6"}>{constructLearningOpps()}</p>
                    <hr/>
                    <div className={"is-flex is-justify-content-space-between"}>
                        <div>
                            <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Starts</p>
                            <p className={"has-text-weight-semibold is-size-4"}>{getDateFromString(opportunity?.opportunityDates[0].startDate)}</p>
                        </div>
                        <div>
                            <p className={"has-text-primary is-size-6 has-text-weight-semibold"}>Ends</p>
                            <p className={"has-text-weight-semibold is-size-4"}>{getDateFromString(opportunity?.opportunityDates[0].endDate)}</p>
                        </div>
                    </div>
                    <hr/>
                    {hostMode ?
                        <button className={"button is-danger is-outlined has-text-weight-semibold is-fullwidth"}
                                onClick={()=>setIsActiveDelModal(true)}>
                            Delete</button>:
                        <button className={"button is-primary is-outlined has-text-weight-semibold is-fullwidth"}
                                onClick={()=>setIsActiveBookModal(true)}>
                            Book</button>
                    }
                </div>
            </div>
            {(isActiveDelModal&&hostMode)&&
                <GenericModal title={"Delete Opportunity"} action={delOpportunity} close={onCloseModal}
                              bodyMessage={"Are you sure you want to delete this opportunity?"}/>
            }
            {(isActiveBookModal&&!hostMode&&opportunity)&&
                <BookModal active={isActiveBookModal} setActive={setIsActiveBookModal}
                           opportunity={opportunity}/>
            }
        </React.Fragment>
    )
};

export default Opportunity;