import React, {useEffect, useState} from "react";
import {
    FiltersFields,
    FilterTypes, OpportunityDates,
    RefData
} from "@src/state/stores/opportunity/models";
import cloneDeep from "lodash/cloneDeep";
import {getTotalOpportunities} from "@src/state/stores/opportunity/operations";
import CustomDateRangeInput from "@src/views/common/CustomDateRangeInput";

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
    filters:FiltersFields|undefined,
    setFilters:any
}

const FiltersModal:React.FunctionComponent<Props> = ({active,setActive,categories,setCategories,languages,setLanguages,helps,setHelps
,accommodations,setAccommodations,setMeals,meals, filters,setFilters}) =>{

    const [dates,setDates] = useState<any>();
    const [totalResults,setTotalResults] = useState<number>();
    const [opportunityDateRange,setOpportunityDateRange] = useState<OpportunityDates>();

    useEffect(()=>{
        if(active){
            getTotalOpportunities(filters)
                .then((response)=>{
                    setTotalResults(response);
                })
        }
    },[filters,active])

    useEffect(()=>{
        let tmp = cloneDeep(filters)||{};
        // @ts-ignore
        tmp.startDate = opportunityDateRange?.startDate;
        // @ts-ignore
        tmp.endDate = opportunityDateRange?.endDate
        setFilters(tmp);
    },[opportunityDateRange])

    const onFilterChanged = (type:FilterTypes,value:any) =>{
            let tmp = cloneDeep(filters)||{};
            switch (type){
                case FilterTypes.CATEGORY:{
                    // @ts-ignore
                    if(value==tmp.opportunityCategory){
                        // @ts-ignore
                        tmp.opportunityCategory=undefined
                    }else{
                        // @ts-ignore
                        tmp.opportunityCategory = value;
                    }
                    break;
                }
                case FilterTypes.TYPE_OF_HELP:{
                    // @ts-ignore
                    if(!tmp.typeOfHelpNeeded){
                        // @ts-ignore
                        tmp.typeOfHelpNeeded=[];
                    }
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
                    if(tmp.accommodationProvided==value){
                        // @ts-ignore
                        tmp.accommodationProvided=undefined
                    }else{
                        // @ts-ignore
                        tmp.accommodationProvided = value;
                    }
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

            // @ts-ignore
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

    const clearFilters = () =>{
        if(filters){
            let tmp = cloneDeep(filters);
            filters.opportunityCategory = undefined;
            filters.minimumDays = undefined;
            filters.maximumDays = undefined;
            filters.typeOfHelpNeeded = [];
            filters.accommodationProvided = undefined;
            filters.languagesRequired = [];
            filters.startDate = undefined;
            filters.endDate = undefined;

            let tmpCat = [...categories]
            tmpCat.forEach(value => value.selected=false);
            setCategories(tmpCat);

            let tmpHelps = [...helps]
            tmpHelps.forEach(value => value.selected=false);
            setHelps(tmpHelps);

            let tmpAccom = [...accommodations]
            tmpAccom.forEach(value => value.selected=false);
            setAccommodations(tmpAccom);

            let tmpMeals = [...meals]
            tmpMeals.forEach(value => value.selected=false);
            setMeals(tmpMeals);

            let tmpLanguages = [...languages]
            tmpLanguages.forEach(value => value.selected=false);
            setLanguages(tmpLanguages);

            setFilters(tmp);
        }
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
                        <label className="label has-text-weight-medium">Select Dates</label>
                        <CustomDateRangeInput setDateRange={setOpportunityDateRange}/>
                    </div>
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
                    <a  onClick={()=>clearFilters()}>Clear</a>
                    <button className={"button "+((totalResults&&totalResults>0)?"has-text-white has-background-primary":"")} onClick={()=>setActive(false)}>
                        {(totalResults&&totalResults>0)?"Show "+totalResults+" opportunities":"No results found"}</button>
                </footer>
            </div>
        </div>
    )
}

export default FiltersModal;