import React, {useEffect, useState} from "react";
import {
    Accommodation, AccommodationType,
    FiltersFields,
    FilterTypes, Languages, LanguagesType, Meal, MealType,
    OpportunityCategory,
    OpportunityCategoryType,
    RefData, TypeOfHelpNeeded, TypeOfHelpNeededType,
} from "@src/state/stores/opportunity/models";
import cloneDeep from "lodash/cloneDeep";

export interface Props{
    active:boolean,
    setActive:any,
    categories:RefData[],
    setCategories:any,
    helps:RefData[],
    setHelps:any,
    accommodations:RefData[],
    setAccommodations:any,
    meals:RefData[],
    setMeals:any,
    languages:RefData[],
    setLanguages:any,
    endDate:Date|undefined,
    setEndDate:any,
    startDate:Date|undefined,
    setStartDate:any,
}

const FiltersModal:React.FunctionComponent<Props> = ({active,setActive,categories,setCategories,languages,setLanguages,helps,setHelps
,accommodations,setAccommodations,setMeals,meals,endDate,setEndDate,startDate,setStartDate}) =>{

    const [dates,setDates] = useState<any>();
    const [filters,setFilters] = useState<FiltersFields>();

    useEffect(()=>{



    },[])

    useEffect(()=>{
        if(active&&filters){
            console.log("Call api from Modal");
            console.log(filters);
        }
    },[filters])

    const onFilterChanged = (type:FilterTypes,value:any) =>{
            let tmp = cloneDeep(filters);
            switch (type){
                case FilterTypes.CATEGORY:{
                    // @ts-ignore
                    tmp.opportunityCategory = value;
                    break;
                }
                case FilterTypes.TYPE_OF_HELP:{
                    // @ts-ignore
                    let idx = tmp.typeOfHelpNeeded.findIndex(help=>help == value);
                    if(idx>-1){ // @ts-ignore
                        tmp.typeOfHelpNeeded.splice(idx,1);}
                    else{
                        // @ts-ignore
                        tmp.typeOfHelpNeeded.push(value);
                    }
                    break;
                }
                case FilterTypes.MINDAYS:{
                    // @ts-ignore
                    tmp.minimumDays = value;
                    break;
                }
                case FilterTypes.MAXDAYS:{
                    // @ts-ignore
                    tmp.maximumDays = value;
                    break;
                }
                case FilterTypes.LANGUAGE:{
                    // @ts-ignore
                    let idx = tmp.languagesRequired.findIndex(lang=>lang == value);
                    if(idx>-1){ // @ts-ignore
                        tmp.languagesRequired.splice(idx,1);}
                    else{
                        // @ts-ignore
                        tmp.languagesRequired.push(value);
                    }
                    break;
                }
                case FilterTypes.ACCOMMODATION:{
                    // @ts-ignore
                    tmp.accommodationProvided = value;
                    break;
                }
                case FilterTypes.MEAL:{
                    // @ts-ignore
                    let idx = tmp.meals.findIndex(meal=>meal == value);
                    if(idx>-1){ // @ts-ignore
                        tmp.meals.splice(idx,1);}
                    else{
                        // @ts-ignore
                        tmp.meals.push(value);
                    }
                    break;
                }
                case FilterTypes.LONGTITUDE:{
                    // @ts-ignore
                    tmp.longitude = value;
                    break;
                }
                case FilterTypes.LATITUDE:{
                    // @ts-ignore
                    tmp.latitude = value;
                    break;
                }
                case FilterTypes.END_DATE:{
                    // @ts-ignore
                    tmp.endDate = value;
                    break;
                }
                case FilterTypes.START_DATE:{
                    // @ts-ignore
                    tmp.startDate = value;
                    break;
                }
            }
            setFilters(tmp);
    }

    const renderCategories = () =>{
        let array:any[]=[];
        for(let item of categories){
            array.push(<span key={"opportunity-category-"+item.value}
                             className={"tag is-primary m-1 "+(!item.selected?"is-light":"")} onClick={()=>updateCategories(item)}>
                {item.label}
            </span>)
        }
        return array;
    }

    const updateCategories = (item:RefData) =>{
        onFilterChanged(FilterTypes.CATEGORY, item.value);
        let tmp = [...categories];
        let idx = categories.findIndex(value => value.value==item.value);
        let idxToRevert = categories.findIndex(value => value.selected);
        if(idx>-1){
            tmp[idx].selected = !tmp[idx].selected;
        }
        if(idxToRevert>-1){
            tmp[idxToRevert].selected = false;
        }
        setCategories(tmp);
    }

    const renderTypesOfHelp = () =>{
        let array:any[]=[];
        for(let item of helps){
            array.push(<span key={"opportunity-help-"+item.value}
                className={"tag is-primary m-1 "+(!item.selected?"is-light":"")} onClick={()=>updateHelps(item)}>
                {item.label}
            </span>)
        }
        return array;
    }

    const updateHelps = (item:RefData) =>{
        onFilterChanged(FilterTypes.TYPE_OF_HELP, item.value);
        let tmp = [...helps];
        let idx = helps.findIndex(value => value.value==item.value);
        if(idx>-1){
            tmp[idx].selected = !tmp[idx].selected;
        }
        setHelps(tmp);
    }

    const renderAccommodations = () =>{
        let array:any[]=[];
        for(let item of accommodations){
            array.push(<span key={"opportunity-accommodation-"+item.value} onClick={()=>updateAccommodations(item)}
                className={"tag is-primary m-1 "+(!item.selected?"is-light":"")}>
                {item.label}
            </span>)
        }
        return array;
    }

    const updateAccommodations = (item:RefData) =>{
        onFilterChanged(FilterTypes.ACCOMMODATION, item.value);
        let tmp = [...accommodations];
        let idx = accommodations.findIndex(value => value.value==item.value);
        let idxToRevert = accommodations.findIndex(value => value.selected);
        if(idx>-1){
            tmp[idx].selected = !tmp[idx].selected;
        }
        if(idxToRevert>-1){
            tmp[idxToRevert].selected = false;
        }
        setAccommodations(tmp);
    }

    const renderMeals = () =>{
        let array:any[]=[];
        for(let item of meals){
            array.push(<span key={"opportunity-meal-"+item.value} onClick={()=>updateMeals(item)}
                className={"tag is-primary m-1 "+(!item.selected?"is-light":"")}>
                {item.label}
            </span>)
        }
        return array;
    }

    const updateMeals = (item:RefData) =>{
        onFilterChanged(FilterTypes.MEAL, item.value);
        let tmp = [...meals];
        let idx = meals.findIndex(value => value.value==item.value);
        if(idx>-1){
            tmp[idx].selected = !tmp[idx].selected;
        }
        setMeals(tmp);
    }

    const renderLanguages = () =>{
        let array:any[]=[];
        for(let item of languages){
            array.push(<span key={"opportunity-language-"+item.value} onClick={()=>updateLanguages(item)}
                className={"tag is-primary m-1 "+(!item.selected?"is-light":"")}>
                {item.label}
            </span>)
        }
        return array;
    }

    const updateLanguages = (item:RefData) =>{
        onFilterChanged(FilterTypes.LANGUAGE, item.value);
        let tmp = [...languages];
        let idx = languages.findIndex(value => value.value==item.value);
        if(idx>-1){
            tmp[idx].selected = !tmp[idx].selected;
        }
        setLanguages(tmp);
    }

    return(
        <div className={"modal "+(active?"is-active":'')}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Filters</p>
                    <button className="delete" aria-label="close" onClick={()=>setActive(false)}></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label has-text-weight-medium">Category</label>
                        <div className="field is-grouped is-grouped-multiline mt-3 mb-3"
                             style={{borderRadius:"8px",cursor:'pointer'}}>
                            {renderCategories()}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-medium">Setup minimun & maximum days</label>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-medium">Type of help</label>
                        <div className="field is-grouped is-grouped-multiline mt-3 mb-3"
                             style={{borderRadius:"8px",cursor:'pointer'}}>
                            {renderTypesOfHelp()}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-medium">Accommodation</label>
                        <div className="field is-grouped is-grouped-multiline mt-3 mb-3"
                             style={{borderRadius:"8px",cursor:'pointer'}}>
                            {renderAccommodations()}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-medium">Meals</label>
                        <div className="field is-grouped is-grouped-multiline mt-3 mb-3"
                             style={{borderRadius:"8px",cursor:'pointer'}}>
                            {renderMeals()}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-weight-medium">Required Languages</label>
                        <div className="field is-grouped is-grouped-multiline mt-3 mb-3"
                             style={{borderRadius:"8px",cursor:'pointer'}}>
                            {renderLanguages()}
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot is-justify-content-space-between">
                    <a  onClick={()=>setActive(false)}>Clear</a>
                    <button className="button" onClick={()=>setActive(false)}>
                        There are no opportunities</button>
                </footer>
            </div>
        </div>
    )
}

export default FiltersModal;