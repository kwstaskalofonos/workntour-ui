import React, {useEffect, useRef, useState} from "react";
import {GoogleMap, LoadScript, StandaloneSearchBox} from "@react-google-maps/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons/faSliders";
import {faMap} from "@fortawesome/free-solid-svg-icons/faMap";
import FiltersModal from "@src/views/traveler/home/FiltersModal";
import {
    Accommodation, AccommodationType, FiltersFields, Languages, LanguagesType, Meal, MealType, Opportunity,
    OpportunityCategory,
    OpportunityCategoryType, Optional,
    TypeOfHelpNeeded,
    TypeOfHelpNeededType
} from "@src/state/stores/opportunity/models";
import cloneDeep from "lodash/cloneDeep";
import {getOpportunitiesByLocation} from "@src/state/stores/opportunity/operations";
import OpportunityTravelerCard from "@src/views/traveler/home/OpportunityTravelerCard";

const HomePage:React.FunctionComponent = () =>{

    // @ts-ignore
    const google  = window.google;
    const [searchBox,setSearchBox] = useState(null);

    const [active,setActive] = useState<boolean>(false);
    const [categories,setCategories] = useState<any[]>([]);
    const [helps,setHelps] = useState<any[]>([]);
    const [accommodations,setAccommodations] = useState<any[]>([]);
    const [meals,setMeals] = useState<any[]>([]);
    const [languages,setLanguages] = useState<any[]>([]);
    const [endDate,setEndDate] = useState<Date>();
    const [startDate,setStartDate] = useState<Date>();
    const [filters,setFilters] = useState<FiltersFields>();

    const [opportunities,setOpportunities] = useState<Opportunity[]>([]);

    useEffect(()=>{
        let tempCategories = initializeCategories();
        let tempHelps = initializeHelps();
        let tempAccommodations = initializeAccommodations();
        let tempMeals = initializeMeals();
        let tempLanguages = initializeLanguages();

        let selectedCategory = tempCategories.filter(value => value.selected).map(value => OpportunityCategory[value.value as OpportunityCategoryType]);
        let selectedHelps = tempHelps.filter(value => value.selected).map(value => TypeOfHelpNeeded[value.value as TypeOfHelpNeededType]);
        let selectedLanguage = tempLanguages.filter(value => value.selected).map(value => Languages[value.value as LanguagesType]);
        let selectedAccommodation = tempAccommodations.filter(value => value.selected).map(value => Accommodation[value.value as AccommodationType]);
        let selectedMeals = tempMeals.filter(value => value.selected).map(value => Meal[value.value as MealType]);
        let maxDays = 23;
        let minDays = 1;
        //set end date
        //set start date
        //set longtitude
        //set latitude
        let tmp:FiltersFields = {
            opportunityCategory:selectedCategory[0],
            typeOfHelpNeeded:selectedHelps,
            minimumDays:minDays,
            maximumDays:maxDays,
            languagesRequired:selectedLanguage,
            accommodationProvided:selectedAccommodation[0],
            meals:selectedMeals,longitude:12.34244343,latitude:45.1241241,endDate:"",startDate:""};
        setFilters(tmp);

    },[])

    useEffect(()=>{
        console.log(filters);
        if(!active&&filters?.longitude&&filters.latitude){
            let optional:Optional = {value:filters};
            getOpportunitiesByLocation(optional,0,15)
                .then((response)=>{
                    setOpportunities(response);
                });
        }
    },[filters])

    useEffect(()=>{
        console.log(opportunities);
    },[opportunities])

    const initializeCategories = () =>{
        let array:any[]=[];
        for(let item in OpportunityCategory){
            array.push({value:item,label:OpportunityCategory[item as OpportunityCategoryType],selected:false})
        }
        setCategories(array);
        return array;
    }

    const initializeHelps = () =>{
        let array:any[]=[];
        for(let item in TypeOfHelpNeeded){
            array.push({value:item,label:TypeOfHelpNeeded[item as TypeOfHelpNeededType],selected:false})
        }
        setHelps(array);
        return array;
    }

    const initializeAccommodations = () =>{
        let array:any[]=[];
        for(let item in Accommodation){
            array.push({value:item,label:Accommodation[item as AccommodationType],selected:false})
        }
        setAccommodations(array);
        return array;
    }

    const initializeMeals = () =>{
        let array:any[]=[];
        for(let item in Meal){
            array.push({value:item,label:Meal[item as MealType],selected:false})
        }
        setMeals(array);
        return array;
    }

    const initializeLanguages = () =>{
        let array:any[]=[];
        for(let item in Languages){
            array.push({value:item,label:Languages[item as LanguagesType],selected:false})
        }
        setLanguages(array);
        return array;
    }

    const onLocationChanged = () =>{
        if(searchBox){
            let tmp = cloneDeep(filters);
            // @ts-ignore
            tmp.longitude = searchBox.getPlaces()[0].geometry.location.lng();
            // @ts-ignore
            tmp.latitude = searchBox.getPlaces()[0].geometry.location.lat();
            setFilters(tmp);
        }
    }

    const onSBLoad = (ref:any) =>{
        setSearchBox(ref);
    }

    return(
        <React.Fragment>
            <section>
                <div className={"columns"}>
                    <div className={"column is-1"}/>
                    <div className={"column is-10"}>
                        <div className={"container is-flex is-justify-content-center"}>
                            <div className="field has-addons">
                                <p className="control">
                                    <LoadScript
                                        // @ts-ignore
                                        googleMapsApiKey={__API_KEY__}
                                        libraries={["places"]}>
                                        <StandaloneSearchBox
                                            onLoad={onSBLoad}
                                            onPlacesChanged={()=>onLocationChanged()}>
                                            <input className={"input has-text-primary"}
                                                   type="text"
                                                   placeholder="Search Location"
                                                   style={{
                                                       boxSizing: `border-box`,
                                                       border: `1px solid hsl(0deg, 0%, 86%)`,
                                                       fontSize: '14px',
                                                       height:'40px',
                                                       width:'100%',
                                                       outline: `none`,
                                                       textOverflow: `ellipses`,
                                                   }}/>
                                        </StandaloneSearchBox>
                                    </LoadScript>
                                </p>
                                <p className="control">
                                    <a className="button" onClick={()=>setActive(true)}>
                                    <span className={"icon is-small is-right"}>
                                     <FontAwesomeIcon className={"has-text-primary"} icon={faSliders}/>
                                    </span>
                                        <span className={"has-text-primary"}>Filters</span>
                                    </a>
                                </p>
                            </div>
                            <div className={"field ml-1"}>
                                <a className="button" onClick={()=>setActive(true)}>
                                    <span className={"icon is-small is-right"}>
                                     <FontAwesomeIcon className={"has-text-primary"} icon={faMap}/>
                                    </span>
                                    <span className={"has-text-primary"}>Map</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={"is-1"}/>
                </div>
            </section>
            <section>
                <div className="columns is-multiline">
                    {opportunities&&opportunities.map(value => <div className={"column is-one-fifth-desktop is-6-tablet"}>
                        <OpportunityTravelerCard opportunity={value}/>
                        </div>
                    )}
                </div>
            </section>
            <FiltersModal active={active} setActive={setActive}
            categories={categories} setCategories={setCategories}
            accommodations={accommodations} setAccommodations={setAccommodations}
            helps={helps} setHelps={setHelps}
            languages={languages} setLanguages={setLanguages}
            meals={meals} setMeals={setMeals}
            endDate={endDate} setEndDate={setEndDate}
            startDate={startDate} setStartDate={setStartDate}/>
        </React.Fragment>
    )
};

export default HomePage;