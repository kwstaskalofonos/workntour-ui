import React, {useEffect, useRef, useState} from "react";
import {GoogleMap, LoadScript, StandaloneSearchBox} from "@react-google-maps/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons/faSliders";
import FiltersModal from "@src/views/traveler/home/FiltersModal";
import {
    Accommodation, AccommodationType, Languages, LanguagesType, Meal, MealType,
    OpportunityCategory,
    OpportunityCategoryType,
    TypeOfHelpNeeded,
    TypeOfHelpNeededType
} from "@src/state/stores/opportunity/models";

const HomePage:React.FunctionComponent = () =>{

    // @ts-ignore
    const google  = window.google;
    const [searchBox,setSearchBox] = useState(null);

    const [active,setActive] = useState<boolean>(true);
    const [categories,setCategories] = useState<any[]>([]);
    const [helps,setHelps] = useState<any[]>([]);
    const [accommodations,setAccommodations] = useState<any[]>([]);
    const [meals,setMeals] = useState<any[]>([]);
    const [languages,setLanguages] = useState<any[]>([]);

    useEffect(()=>{
        initializeCategories();
        initializeHelps();
        initializeAccommodations();
        initializeMeals();
        initializeLanguages();
    },[])

    const initializeCategories = () =>{
        let array:any[]=[];
        for(let item in OpportunityCategory){
            array.push({value:item,label:OpportunityCategory[item as OpportunityCategoryType],selected:false})
        }
        setCategories(array);
    }

    const initializeHelps = () =>{
        let array:any[]=[];
        for(let item in TypeOfHelpNeeded){
            array.push({value:item,label:TypeOfHelpNeeded[item as TypeOfHelpNeededType],selected:false})
        }
        setHelps(array);
    }

    const initializeAccommodations = () =>{
        let array:any[]=[];
        for(let item in Accommodation){
            array.push({value:item,label:Accommodation[item as AccommodationType],selected:false})
        }
        setAccommodations(array);
    }

    const initializeMeals = () =>{
        let array:any[]=[];
        for(let item in Meal){
            array.push({value:item,label:Meal[item as MealType],selected:false})
        }
        setMeals(array);
    }

    const initializeLanguages = () =>{
        let array:any[]=[];
        for(let item in Languages){
            array.push({value:item,label:Languages[item as LanguagesType],selected:false})
        }
        setLanguages(array);
    }

    const onChangeLocation = (value:string) =>{
        let request = {
            query: value,
            fields: ['name', 'geometry'],
        };
        const service = google.maps.places.PlacesService;
        // @ts-ignore
        service.findPlaceFromQuery(request,(results, status)=>{
            if(status === window.google.maps.places.PlacesServiceStatus.OK){
                console.log(results);
            }
        })
    }

    const onLocationChanged = () =>{
        console.log(searchBox)
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
                                                   onChange={(event)=>console.log(event.currentTarget.value)}
                                                   style={{
                                                       boxSizing: `border-box`,
                                                       border: `1px solid hsl(0deg, 0%, 86%)`,
                                                       fontSize: `14px`,
                                                       height:'40px',
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
                        </div>
                    </div>
                    <div className={"is-1"}/>
                </div>
            </section>
            <FiltersModal active={active} setActive={setActive}
            categories={categories} setCategories={setCategories}
            accommodations={accommodations} setAccommodations={setAccommodations}
            helps={helps} setHelps={setHelps}
            languages={languages} setLanguages={setLanguages}
            meals={meals} setMeals={setMeals}/>
        </React.Fragment>
    )
};

export default HomePage;