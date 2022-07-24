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

const Opportunity:React.FunctionComponent = () =>{

    const {id} = useParams();
    const [opportunity,setOpportunity] = useState<Opportunity>();
    const [location,setLocation] = useState({lat:0,lng:0});
    const [isActiveDelModal,setIsActiveDelModal] = useState<boolean>(false);

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
                    style={{borderTopLeftRadius:'3px',borderTopRightRadius:'3px',
                    borderBottomLeftRadius:'3px',borderBottomRightRadius:'3px'}}/>
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
                const index = Object.values(TypeOfHelpNeeded).indexOf(help as unknown as TypeOfHelpNeeded);
                helpNeeded = helpNeeded+Object.keys(TypeOfHelpNeeded)[index]+((counter==opportunity?.typeOfHelpNeeded.length)?"":', ');
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
                const index = Object.values(Meal).indexOf(meal as unknown as Meal);
                mealsProvided = mealsProvided+Object.keys(Meal)[index]+((counter==opportunity?.meals.length)?"":', ');
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
                const index = Object.values(Languages).indexOf(language as unknown as Languages);
                languages = languages+Object.keys(Languages)[index]+((counter==opportunity?.languagesRequired.length)?"":', ');
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
                const index = Object.values(Languages).indexOf(language as unknown as Languages);
                languages = languages+Object.keys(Languages)[index]+((counter==opportunity?.languagesSpoken.length)?"":', ');
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
                const index = Object.values(LearningOpportunities).indexOf(learningOpp as unknown as LearningOpportunities);
                learningOpps = learningOpps+Object.keys(LearningOpportunities)[index]+((counter==opportunity?.learningOpportunities.length)?"":', ');
                counter = counter+1;
            }
        }
        return learningOpps;
    }

    const extractAccommodation = () =>{
        const index = Object.values(Accommodation).indexOf(opportunity?.accommodationProvided as unknown as Accommodation);
        return Object.keys(Accommodation)[index];
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
                    <button className={"button is-danger is-outlined has-text-weight-semibold is-fullwidth"}
                    onClick={()=>setIsActiveDelModal(true)}>
                        Delete</button>
                </div>
            </div>
            {isActiveDelModal&&
                <GenericModal title={"Delete Opportunity"} action={delOpportunity} close={onCloseModal}
                              bodyMessage={"Are you sure you want to delete this opportunity?"}/>
            }
        </React.Fragment>
    )
};

export default Opportunity;