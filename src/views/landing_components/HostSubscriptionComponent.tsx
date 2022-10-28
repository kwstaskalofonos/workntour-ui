import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {
    OpportunityCategory,
    OpportunityCategoryType,
    TypeOfHelpNeeded,
    TypeOfHelpNeededType
} from "@src/state/stores/opportunity/models";
import {
    HostHomeForm,
    MinNumOfDays,
    MinNumOfDaysType,
    Season,
    SeasonType,
} from "@src/state/stores/subscriptions/models";
import NumberFormat from "react-number-format";
import {subscribeAsHost} from "@src/state/stores/subscriptions/operations";

const HostSubscriptionComponent: React.FunctionComponent = () => {

    const form = useForm();
    const {register, handleSubmit, getValues, formState: {errors}} = form;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [monthSub, setMonthSub] = useState<number>();


    const renderTypesOfHost = () => {
        let array: any[] = [];
        array.push(<option key={"opportunityCategory-option-empty"} value={""}>Select Type</option>)
        for (const item in OpportunityCategory) {
            array.push(<option key={"opportunityCategory-option-" + item}
                               value={item}
                               label={OpportunityCategory[item as OpportunityCategoryType]}>{OpportunityCategory[item as OpportunityCategoryType]}</option>)
        }
        return array;
    }

    const renderTypesOfHelp = () => {
        let array: any[] = [];
        array.push(<option key={"typeOfHelps-option-empty"} value={""}>Select the type of help you will need to receive from a traveler</option>)
        for (const item in TypeOfHelpNeeded) {
            array.push(<option key={"typeOfHelps-option-" + item}
                               value={item}
                               label={TypeOfHelpNeeded[item as TypeOfHelpNeededType]}>{TypeOfHelpNeeded[item as TypeOfHelpNeededType]}</option>)
        }
        return array;
    }

    const renderMinDays = () => {
        let array: any[] = [];
        array.push(<option key={"minNumDays-option-empty"} value={""}>Tell us the minimum number of days you would want a traveler to do Workntour</option>)
        for (const item in MinNumOfDays) {
            array.push(<option key={"minNumDays-option-" + item}
                               value={item}
                               label={MinNumOfDays[item as MinNumOfDaysType]}>{MinNumOfDays[item as MinNumOfDaysType]}</option>)
        }
        return array;
    }

    const renderSeasons = () =>{
        let array: any[] = [];
        array.push(<option key={"seasons-option-empty"} value={""}>Select when you would like to host a traveler</option>)
        for (const item in Season) {
            array.push(<option key={"seasons-option-" + item}
                               value={item}
                               label={Season[item as SeasonType]}>{Season[item as SeasonType]}</option>)
        }
        return array;
    }

    const updateMonthlySub = (value:number) =>{
        setMonthSub(value);
    }

    const onSubmit = (data: HostHomeForm) => {
        if(monthSub){
            data.monthlySubscription = monthSub;
        }else{
            data.monthlySubscription = 0;
        }
        setIsLoading(true);
        subscribeAsHost(data,setIsLoading);
    }

    return (
        <div className={"columns is-centered"}>
            <div className={"column is-paddingless"}/>
            <div className={"column is-half-desktop px-5"}>
                <form>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Type of Host*</label>
                        <div className={"control"}>
                            <div className={"select is-fullwidth"}>
                                <select className={"border-linear has-text-primary"}
                                        {...register("typeOfTraveler", {required: true})}
                                onChange={(event)=>console.log(event.currentTarget.value)}>
                                    {renderTypesOfHost()}
                                </select>
                            </div>
                            {errors.typeOfTraveler &&
                                <p className={"help is-danger"}>Type of Host is required</p>
                            }
                        </div>
                    </div>
                    <div className={"field"}>
                        <label className="label has-text-primary has-text-weight-medium is-normal">Name*</label>
                        <div className="control">
                            <input className="input border-linear is-normal" type="text"
                                   {...register("name", {required: true})}
                                   placeholder="Enter your name"/>
                        </div>
                        {errors.name &&
                            <p className={"help is-danger"}>Name is required</p>
                        }
                    </div>
                    <div className={"field"}>
                        <label className="label has-text-primary has-text-weight-medium is-normal">Email*</label>
                        <div className="control">
                            <input className="input border-linear is-normal" type="text"
                                   {...register("email", {required: true})}
                                   placeholder="Enter your email"/>
                        </div>
                        {errors.email &&
                            <p className={"help is-danger"}>Email is required</p>
                        }
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Tell us what type of help you need*</label>
                        <div className={"control"}>
                            <div className={"select is-fullwidth"}>
                                <select className={"border-linear has-text-primary"}
                                        {...register("typeOfHelpNeeded", {required: true})}>
                                    {renderTypesOfHelp()}
                                </select>
                            </div>
                            {errors.typeOfHelpNeeded &&
                                <p className={"help is-danger"}>Type of help is required</p>
                            }
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Tell us the minimum amount of days you would host a traveler to do
                            Workntout*</label>
                        <div className={"control"}>
                            <div className={"select is-fullwidth"}>
                                <select className={"border-linear has-text-primary"}
                                        {...register("minNumDays", {required: true})}>
                                    {renderMinDays()}
                                </select>
                            </div>
                            {errors.minNumDays &&
                                <p className={"help is-danger"}>Minimum days is required</p>
                            }
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Tell us when you would prefer to host a traveler*</label>
                        <div className={"control"}>
                            <div className={"select is-fullwidth"}>
                                <select className={"border-linear has-text-primary"}
                                        {...register("season", {required: true})}>
                                    {renderSeasons()}
                                </select>
                            </div>
                            {errors.typeOfHelpNeeded &&
                                <p className={"help is-danger"}>Season type is required</p>
                            }
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Tell us how much you would be willing to pay for a yearly subscription
                            (In Euros)*</label>
                        <NumberFormat value={monthSub ? monthSub : ''}
                                      onValueChange={(value) => updateMonthlySub(Number(value.value))}
                                      className={"input border-linear"}
                                      placeholder={"Enter the amount you would wish to pay per month in order to be able to connect with travelers"}
                                      decimalScale={0} allowNegative={false}/>

                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Comments</label>
                        <textarea className="textarea border-linear has-text-primary"
                                  {...register("comments",{maxLength:500})}
                                  placeholder="We want to be part of your journey and share unforgettable memories together, so give us your feedback and tell us what features you would like to see in our product"/>
                        {errors.comments &&
                            <p className={"help is-danger"}>
                                Job description exceeds limit.</p>}
                    </div>
                    <p className={"control has-text-centered"}>
                        <button className={"button has-text-white background-linear-land"+(isLoading?" is-loading":"")}
                                type={"button"} onClick={handleSubmit(onSubmit)}>
                            Submit
                        </button>
                    </p>
                </form>
            </div>
            <div className={"column is-paddingless"}/>
        </div>
    )
};

export default HostSubscriptionComponent;