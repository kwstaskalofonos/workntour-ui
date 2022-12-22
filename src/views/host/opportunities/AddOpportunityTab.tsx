import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons/faCloudUpload";
import {
    Accommodation, AccommodationType,
    Languages, LanguagesType,
    LearningOpportunities, LearningOpportunitiesType,
    Meal, MealType, Opportunity,
    OpportunityCategory, OpportunityCategoryType, OpportunityDates, OpportunityLocation,
    TypeOfHelpNeeded, TypeOfHelpNeededType
} from "@src/state/stores/opportunity/models";
import CustomSelectMultiple from "@src/views/common/CustomSelectMultiple";
import CustomMap from "@src/views/host/opportunities/CustomMap";
import CustomDateRangeInput from "@src/views/common/CustomDateRangeInput";
import {createOpportunityWeb} from "@src/state/stores/opportunity/operations";
import {getCookie} from "@src/utilities/cookies";
import {Role, RoleType} from "@src/state/stores/user/models";
import {toast} from "react-toastify";
import ImageUploader from "@src/views/common/ImageUploader";

const AddOpportunityTab:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,reset,getValues,formState: { errors }} = form;
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [selectedHelps,setSelectedHelps] = useState<TypeOfHelpNeeded[]>([]);
    const [languagesRequired,setLanguagesRequired] = useState<Languages[]>([]);
    const [languagesSpoken,setLanguagesSpoken] = useState<Languages[]>([]);
    const [selectedMeals,setSelectedMeals] = useState<Meal[]>([]);
    const [selectedLearningOpps,setSelectedLearningOpps] = useState<LearningOpportunities[]>([]);
    const [opportunityLocation,setOpportunityLocation] = useState<OpportunityLocation>();
    const [opportunityDateRange,setOpportunityDateRange] = useState<OpportunityDates>();
    const [images,setImages] = useState<File[]>([]);
    const [startDate,setStartDate] = useState<Date>();
    const [endDate,setEndDate] = useState<Date>();
    const [descContent, setDescContent] = useState("");

    const renderCategories = () =>{
        let array:any[]=[];
        array.push(<option key={"category-option-empty"}/>)
        for(const item in OpportunityCategory){
            array.push(<option key={"category-option-"+item}
                               value={item} label={OpportunityCategory[item as OpportunityCategoryType]}>{OpportunityCategory[item as OpportunityCategoryType]}</option>)
        }
        return array;
    }

    const renderTypesOfHelp = () =>{
        let array:any[]=[];
        array.push(<option key={"type-of-help-option-empty"}/>)
        for(const item in TypeOfHelpNeeded){
            array.push(<option key={"type-of-help-option-"+item}
                               value={item} label={TypeOfHelpNeeded[item as TypeOfHelpNeededType]}>{TypeOfHelpNeeded[item as TypeOfHelpNeededType]}</option>)
        }
        return array;
    }

    const renderLanguages = () =>{
        let array:any[]=[];
        array.push(<option key={"language-option-empty"}/>)
        for(const item in Languages){
            array.push(<option key={"language-option-"+item}
                               value={item} label={Languages[item as LanguagesType]}>{Languages[item as LanguagesType]}</option>)
        }
        return array;
    }

    const renderMeals = () =>{
        let array:any[]=[];
        array.push(<option key={"meal-option-empty"}/>)
        for(const item in Meal){
            array.push(<option key={"meal-option-"+item}
                               value={item} label={Meal[item as MealType]}>{Meal[item as MealType]}</option>)
        }
        return array;
    }

    const renderLearningOpportunities = () =>{
        let array:any[]=[];
        array.push(<option key={"learn-opps-option-empty"}/>)
        for(const item in LearningOpportunities){
            array.push(<option key={"learn-opps-option-"+item}
                               value={item} label={LearningOpportunities[item as LearningOpportunitiesType]}>{LearningOpportunities[item as LearningOpportunitiesType]}</option>)
        }
        return array;
    }

    const renderAccommodation = () =>{
        let array:any[]=[];
        array.push(<option key={"accommodation-option-empty"}/>)
        for(const item in Accommodation){
            array.push(<option key={"accommodation-option-"+item}
                               value={item} label={Accommodation[item as AccommodationType]}>{Accommodation[item as AccommodationType]}</option>)
        }
        return array;
    }



    const onSubmit = (data:Opportunity) =>{
        data.memberId = getCookie();
        data.role = Role[getCookie('role') as RoleType];
        data.imageUrls=[];
        data.additionalOfferings=[];
        data.typeOfHelpNeeded = selectedHelps;
        data.languagesRequired = languagesRequired;
        data.languagesSpoken = languagesSpoken;
        data.minimumDays=Number(data.minimumDays);
        data.maximumDays=Number(data.maximumDays);
        data.totalWorkingHours=Number(data.totalWorkingHours);
        data.meals = selectedMeals;
        data.learningOpportunities = selectedLearningOpps;
        if(opportunityDateRange){
            data.opportunityDates=[];
            data.opportunityDates.push(opportunityDateRange);
        }
        if(opportunityLocation){
            data.opportunityLocation = opportunityLocation;
        }
        if(!images||images.length==0){
            toast.error("You have to upload at least one image",{position:toast.POSITION.TOP_RIGHT});
            return;
        }
        let formData = new FormData();
        for(let image of images){
            formData.append('images',image);
        }
        formData.append('newOpportunity',new Blob([JSON.stringify(data)],{type:"application/json"}));
        setIsLoading(true);
        createOpportunityWeb(formData,setIsLoading)
            .then(()=>{
                toast.success("Opportunity created!",{position:toast.POSITION.TOP_RIGHT})
                form.reset();
                setSelectedHelps([]);
                setLanguagesRequired([]);
                setLanguagesSpoken([]);
                setSelectedMeals([]);
                setSelectedLearningOpps([]);
                setImages([]);
                setOpportunityDateRange(undefined);
            });
    }


    return(
        <form>
            <div className="columns is-centered opportunities">
                <div className="column is-4">
                    {/*Category*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">1.Category*</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select className={"border-linear has-text-primary"}
                                        {...register("opportunityCategory",{required:true})}>
                                    {renderCategories()}
                                </select>
                            </div>
                            {errors.opportunityCategory &&
                                <p className={"help is-danger"}>Category is required</p>
                            }
                        </div>
                    </div>
                    {/*Job Title*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">2.Job Title*</label>
                        <input className="input border-linear has-text-primary" type="text"
                               {...register("jobTitle",{required:true})}
                               placeholder="Type Job Title"/>
                        {errors.jobTitle &&
                            <p className={"help is-danger"}>
                                Job Title is required.</p>}
                    </div>
                    {/*Job Description*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Job Description</label>
                        <textarea className="textarea border-linear has-text-primary"
                                  {...register("jobDescription",{maxLength:200})}
                                  placeholder="Make it easy for the travelers to understand their role, what is expected from them and their key responsibilities.Indicate the day-to-day activities so that they understand how they will be able to become part of the local lifestyle."/>
                        {errors.jobDescription &&
                            <p className={"help is-danger"}>
                                Job description exceeds limit.</p>}
                    </div>
                    {/*images*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">
                            3.Images*
                        </label>
                        <p className="help is-primary mb-2">The images you upload should be in high resolution.Like that your traveler will be willing to approach
                         you! It is important to include photos of your property, the accommodation that you will be providing to travelers and anything else
                         that will make your opportunity attractive to travelers.<br/>Please do not include pictures that show the name of your Business or Property,
                        as they will be removed.</p>
                        <ImageUploader images={images} setImages={setImages}/>
                    </div>
                    {/*Type of help*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">4.Type of help*</label>
                        <CustomSelectMultiple placeholder={"Select types of help"} field={"typeOfHelpNeeded"}
                                              register={register} options={renderTypesOfHelp()} enumType={TypeOfHelpNeeded}
                                              selectedValues={selectedHelps} setSelectedValues={setSelectedHelps}/>
                    </div>
                    {/*location*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">5.Select Location*</label>
                        <CustomMap setOpportunityLocation={setOpportunityLocation}/>
                    </div>

                </div>
                <div className="column is-1"/>
                <div className="column is-4">
                    {/*Available Dates*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">6.Available Dates*</label>
                        <CustomDateRangeInput setDateRange={setOpportunityDateRange} resetEndData={false}
                            startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
                    </div>
                    {/*Total working hours*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">7.Setup working days & hours pes week* max(32)</label>
                        <div className="is-flex is-justify-content-space-between">
                            <input className="input border-linear has-text-primary mx-2" type="number"
                                   placeholder="Min Days" {...register("minimumDays",{required:true,min:1})}/>
                            <input className="input border-linear has-text-primary mx-2" type="number"
                                   placeholder="Max Days" {...register("maximumDays",{required:true,min:1})}/>
                            <input className="input border-linear has-text-primary mx-2" type="number"
                                   placeholder="Total hours" {...register("totalWorkingHours",{required:true,min:1})}/>
                        </div>
                        {errors.minimumDays && <p className={"help is-danger"}>Not valid minimum days.</p>}
                        {errors.maximumDays && <p className={"help is-danger"}>Not valid maximum days.</p>}
                        {errors.totalWorkingHours && <p className={"help is-danger"}>Not valid total working hours days.</p>}
                    </div>
                    {/*Languages Required*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">8.Languages Required*</label>
                        <CustomSelectMultiple placeholder={"Select languages required"} field={"languagesRequired"}
                                              register={register} options={renderLanguages()} enumType={Languages}
                                              selectedValues={languagesRequired} setSelectedValues={setLanguagesRequired}/>
                    </div>
                    {/*Languages Spoken*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Languages Spoken*</label>
                        <CustomSelectMultiple placeholder={"Select languages spoken"} field={"languagesSpoken"}
                                              register={register} options={renderLanguages()} enumType={Languages}
                                              selectedValues={languagesSpoken} setSelectedValues={setLanguagesSpoken}/>
                    </div>
                    {/*Accommodation Provided*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">9.Accommodation Provided*</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select className={"border-linear has-text-primary"}
                                        {...register("accommodationProvided",{required:true})}>
                                    {renderAccommodation()}
                                </select>
                            </div>
                        </div>
                        {errors.accommodation &&
                            <p className={"help is-danger"}>
                                Accommodation is required.</p>}
                    </div>
                    {/*Meals*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">10.Meals*</label>
                        <CustomSelectMultiple placeholder={"Select meals"} field={"meals"}
                                              register={register} options={renderMeals()} enumType={Meal}
                                              selectedValues={selectedMeals} setSelectedValues={setSelectedMeals}/>

                    </div>
                    {/*Learning Opportunities*/}
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">11.Add the learning opportunities* that the travelers
                         will benefit from while working and living with you.</label>
                        <CustomSelectMultiple placeholder={"Select learning opportunities"} field={"learningOpportunities"}
                                              register={register} options={renderLearningOpportunities()} enumType={LearningOpportunities}
                                              selectedValues={selectedLearningOpps} setSelectedValues={setSelectedLearningOpps}/>
                    </div>

                    {/*<div className="field is-grouped is-grouped-centered mb-6">*/}
                    {/*    /!*Smoking Allowed*!/*/}
                    {/*    <div className="control">*/}
                    {/*        <label className="checkbox label has-text-primary has-text-weight-medium">*/}
                    {/*            <input type="checkbox" {...register("smokingAllowed")}/>&nbsp;Smoking Allowed</label>*/}
                    {/*    </div>*/}
                    {/*    /!*Wifi*!/*/}
                    {/*    <div className="control">*/}
                    {/*        <label className="checkbox label has-text-primary has-text-weight-medium">*/}
                    {/*            <input type="checkbox" {...register("wifi")}/>&nbsp;Wifi</label>*/}
                    {/*    </div>*/}
                    {/*    /!*Pets allowed*!/*/}
                    {/*    <div className="control">*/}
                    {/*        <label className="checkbox label has-text-primary has-text-weight-medium">*/}
                    {/*            <input type="checkbox" {...register("petsAllowed")}/>&nbsp;Pets allowed</label>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="field mt-6">
                        <p className="control is-fullwidth">
                            <a className={"button is-primary is-fullwidth "+((isLoading)?"is-loading":'')}
                               type={"button"} onClick={handleSubmit(onSubmit)}>
                                Submit
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default AddOpportunityTab;