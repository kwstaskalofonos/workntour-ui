import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons/faCloudUpload";
import {
    Accommodation,
    Languages,
    LearningOpportunities,
    Meal,
    OpportunityCategory,
    TypeOfHelpNeeded
} from "@src/state/stores/opportunity/models";
import CustomSelectMultiple from "@src/views/common/CustomSelectMultiple";

const AddOpportunityTab:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,getValues} = form;

    const [selectedHelps,setSelectedHelps] = useState<TypeOfHelpNeeded[]>([]);
    const [languagesRequired,setLanguagesRequired] = useState<Languages[]>([]);
    const [languagesSpoken,setLanguagesSpoken] = useState<Languages[]>([]);
    const [selectedMeals,setSelectedMeals] = useState<Meal[]>([]);
    const [selectedLearningOpps,setSelectedLearningOpps] = useState<LearningOpportunities[]>([]);

    const renderCategories = () =>{
        let array:any[]=[];
        array.push(<option key={"category-option-empty"}/>)
        for(const item in OpportunityCategory){
            array.push(<option key={"category-option-"+item} value={item} label={item}/>)
        }
        return array;
    }

    const renderTypesOfHelp = () =>{
        let array:any[]=[];
        array.push(<option key={"type-of-help-option-empty"}/>)
        for(const item in TypeOfHelpNeeded){
            array.push(<option key={"type-of-help-option-"+item} value={item} label={item}/>)
        }
        return array;
    }

    const renderLanguages = () =>{
        let array:any[]=[];
        array.push(<option key={"language-option-empty"}/>)
        for(const item in Languages){
            array.push(<option key={"language-option-"+item} value={item} label={item}/>)
        }
        return array;
    }

    const renderMeals = () =>{
        let array:any[]=[];
        array.push(<option key={"meal-option-empty"}/>)
        for(const item in Meal){
            array.push(<option key={"meal-option-"+item} value={item} label={item}/>)
        }
        return array;
    }

    const renderLearningOpportunities = () =>{
        let array:any[]=[];
        array.push(<option key={"learn-opps-option-empty"}/>)
        for(const item in LearningOpportunities){
            array.push(<option key={"learn-opps-option-"+item} value={item} label={item}/>)
        }
        return array;
    }

    const renderAccommodation = () =>{
        let array:any[]=[];
        array.push(<option key={"accommodation-option-empty"}/>)
        for(const item in Accommodation){
            array.push(<option key={"accommodation-option-"+item} value={item} label={item}/>)
        }
        return array;
    }

    return(
        <form>
            <div className="columns">
                <div className="column is-4">
                    {/*Category*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Category*</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select className={"border-linear"} defaultValue={renderCategories()[0]}>
                                    {renderCategories()}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/*Job Description*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Job Description*</label>
                        <input className="input border-linear" type="text"
                               placeholder="Select Opportunity Category"/>
                    </div>
                    {/*Opportunity Dates*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Opportunity Dates*</label>
                        <input className="input border-linear" type="text"
                               placeholder="Select Opportunity Category"/>
                    </div>
                    {/*Days Off*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Days Off*</label>
                        <input className="input border-linear" type="text"
                               placeholder="Select Opportunity Category"/>
                    </div>
                    {/*Accommodation Provided*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Accommodation Provided*</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select className={"border-linear"} defaultValue={renderAccommodation()[0]}>
                                    {renderAccommodation()}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/*Additional Offerings*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Additional Offerings*</label>
                        <input className="input border-linear" type="text"
                               placeholder="Select Opportunity Category"/>
                    </div>
                    {/*Adventures Offered*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Adventures Offered*</label>
                        <input className="input border-linear" type="text"
                               placeholder="Select Opportunity Category"/>
                    </div>

                    <div className="field is-grouped is-grouped-centered">
                        {/*Smoking Allowed*/}
                        <div className="control">
                            <label className="checkbox label has-text-primary has-text-weight-medium">
                                <input type="checkbox"/>&nbsp;Smoking Allowed</label>
                        </div>
                        {/*Wifi*/}
                        <div className="control">
                            <label className="checkbox label has-text-primary has-text-weight-medium">
                                <input type="checkbox"/>&nbsp;Wifi</label>
                        </div>
                        {/*Pets allowed*/}
                        <div className="control">
                            <label className="checkbox label has-text-primary has-text-weight-medium">
                                <input type="checkbox"/>&nbsp;Pets allowed</label>
                        </div>
                    </div>

                </div>
                <div className="column is-4">
                    {/*Job Title*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Job Title*</label>
                        <input className="input border-linear" type="text"
                               placeholder="Select Opportunity Category"/>
                    </div>
                    {/*Type of help*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Type of help*</label>
                        <CustomSelectMultiple placeholder={"Select types of help"} field={"typeOfHelp"}
                                              register={register} options={renderTypesOfHelp()}
                                                selectedValues={selectedHelps} setSelectedValues={setSelectedHelps}/>
                    </div>
                    {/*Total working hours*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Total working hours*</label>
                        <input className="input border-linear" type="text"
                               placeholder="Select Opportunity Category"/>
                    </div>
                    {/*Languages Required*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Languages Required*</label>
                        <CustomSelectMultiple placeholder={"Select languages required"} field={"languagesRequired"}
                                              register={register} options={renderLanguages()}
                                              selectedValues={languagesRequired} setSelectedValues={setLanguagesRequired}/>
                    </div>
                    {/*Languages Spoken*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Languages Spoken*</label>
                        <CustomSelectMultiple placeholder={"Select languages spoken"} field={"languagesSpoken"}
                                              register={register} options={renderLanguages()}
                                              selectedValues={languagesSpoken} setSelectedValues={setLanguagesSpoken}/>
                    </div>
                    {/*Meals*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Meals*</label>
                        <CustomSelectMultiple placeholder={"Select meals"} field={"meals"}
                                              register={register} options={renderMeals()}
                                              selectedValues={selectedMeals} setSelectedValues={setSelectedMeals}/>
                    </div>
                    {/*Learning Opportunities*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Learning Opportunities*</label>
                        <CustomSelectMultiple placeholder={"Select learning opportunities"} field={"learningOpportunities"}
                                              register={register} options={renderLearningOpportunities()}
                                              selectedValues={selectedLearningOpps} setSelectedValues={setSelectedLearningOpps}/>
                    </div>

                </div>
                <div className="column is-4">
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">
                            Images
                        </label>
                        <div className="file is-large is-boxed is-fullwidth">
                            <label className="file-label border-linear-radius">
                                <input className="file-input" type="file" name="resume" multiple={true}/>
                                <span className="file-cta">
                                      <FontAwesomeIcon className={"has-text-primary"} icon={faCloudUpload}/>
                                      <span className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold">
                                        Click to upload your images</span>
                                        <p className="file-label has-text-primary has-text-centered is-size-6 has-text-weight-light">
                                        SVG,PNG,JPG or GIF (max. 800x400px)
                                      </p>
                                    </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
                <p className="control">
                    <a className="button is-primary">
                        Submit
                    </a>
                </p>
                <p className="control">
                    <a className="button is-light">
                        Cancel
                    </a>
                </p>
            </div>
        </form>
    )
};

export default AddOpportunityTab;