import React, {forwardRef, useImperativeHandle, useState} from "react";
import CustomDateRangeInput from "@src/views/common/CustomDateRangeInput";
import { RefData,} from "@src/state/stores/opportunity/models";

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
    setLanguages:any
}

const FiltersModal:React.FunctionComponent<Props> = ({active,setActive,categories,setCategories,languages,setLanguages,helps,setHelps
,accommodations,setAccommodations,setMeals,meals}) =>{

    const [dates,setDates] = useState<any>();


    const renderCategories = () =>{
        let array:any[]=[];
        for(let item of categories){
            array.push(<span key={"opportunity-category-"+item.value}
                             className={"tag is-primary m-1 "+(!item.selected?"is-light":"")} onClick={()=>updateCategories(item)}>
                {item.value}
            </span>)
        }
        return array;
    }

    const updateCategories = (item:RefData) =>{
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
                {item.value}
            </span>)
        }
        return array;
    }

    const updateHelps = (item:RefData) =>{
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
                {item.value}
            </span>)
        }
        return array;
    }

    const updateAccommodations = (item:RefData) =>{
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
                {item.value}
            </span>)
        }
        return array;
    }

    const updateMeals = (item:RefData) =>{
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
                {item.value}
            </span>)
        }
        return array;
    }

    const updateLanguages = (item:RefData) =>{
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
                        <div className={"wrapper"}>
                            <div className={"slider-container"}>
                                <div className={"slider-track"}></div>
                                <input type={"range"} min={"0"} max={"48"} value={"30"} id={"slider-1"}/>
                                <input type={"range"} min={"0"} max={"48"} value={"30"} id={"slider-2"}/>
                            </div>
                        </div>
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
                    <a  onClick={()=>setActive(false)}>Cancel</a>
                    <button className="button" onClick={()=>setActive(false)}>
                        There are no opportunities</button>
                </footer>
            </div>
        </div>
    )
}

export default FiltersModal;