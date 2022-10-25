import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {TypeOfTraveler, TypeOfTravelerType} from "@src/state/stores/user/models";
import {
    MinNumOfDays,
    MinNumOfDaysType,
    TravelerCompany, TravelerCompanyType,
    TravelerHomeForm
} from "@src/state/stores/subscriptions/models";
import {FilterTypes, TypeOfHelpNeeded, TypeOfHelpNeededType} from "@src/state/stores/opportunity/models";
import NumberFormat from "react-number-format";


const TravelerSubscriptionComponent: React.FunctionComponent = () => {

    const form = useForm();
    const {register, handleSubmit, getValues, formState: {errors}} = form;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [minDays,setMinDays] = useState<number>();

    const renderTypesOfTraveler = () => {
        let array: any[] = [];
        array.push(<option key={"typeOfTraveler-option-empty"}/>)
        for (const item in TypeOfTraveler) {
            if (TypeOfTraveler[item as TypeOfTravelerType] !== TypeOfTraveler.FAMILY) {
                array.push(<option key={"typeOfTraveler-option-" + item}
                                   value={item}
                                   label={TypeOfTraveler[item as TypeOfTravelerType]}>{TypeOfTraveler[item as TypeOfTravelerType]}</option>)
            }
        }
        return array;
    }

    const renderTypesOfHelp = () => {
        let array: any[] = [];
        array.push(<option key={"typeOfHelps-option-empty"}/>)
        for (const item in TypeOfHelpNeeded) {
            array.push(<option key={"typeOfHelps-option-" + item}
                               value={item}
                               label={TypeOfHelpNeeded[item as TypeOfHelpNeededType]}>{TypeOfHelpNeeded[item as TypeOfHelpNeededType]}</option>)
        }
        return array;
    }

    const renderMinDays = () => {
        let array: any[] = [];
        array.push(<option key={"minNumDays-option-empty"}/>)
        for (const item in MinNumOfDays) {
            array.push(<option key={"minNumDays-option-" + item}
                               value={item}
                               label={MinNumOfDays[item as MinNumOfDaysType]}>{MinNumOfDays[item as MinNumOfDaysType]}</option>)
        }
        return array;
    }

    const renderTravCompany = () => {
        let array: any[] = [];
        array.push(<option key={"travelerCompany-option-empty"}/>)
        for (const item in TravelerCompany) {
            array.push(<option key={"travelerCompany-option-" + item}
                               value={item}
                               label={TravelerCompany[item as TravelerCompanyType]}>{TravelerCompany[item as TravelerCompanyType]}</option>)
        }
        return array;
    }

    const updateMinDays = (value:number) =>{
        setMinDays(value);
    }

    const onSubmit = (data: TravelerHomeForm) => {

    }

    return (
        <div className={"columns is-centered"}>
            <div className={"column is-half"}>
                <form>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Type of Traveler*</label>
                        <div className={"control"}>
                            <div className={"select is-fullwidth"}>
                                <select className={"border-linear has-text-primary"}
                                        {...register("typeOfTraveler", {required: true})}>
                                    {renderTypesOfTraveler()}
                                </select>
                            </div>
                            {errors.typeOfTraveler &&
                                <p className={"help is-danger"}>Type of Traveler is required</p>
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
                    </div>
                    <div className={"field"}>
                        <label className="label has-text-primary has-text-weight-medium is-normal">Email*</label>
                        <div className="control">
                            <input className="input border-linear is-normal" type="text"
                                   {...register("email", {required: true})}
                                   placeholder="Enter your email"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Type of help you wish to
                            provide*</label>
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
                        <label className="label has-text-primary has-text-weight-medium">Tell us for how long you would
                            do Workntour.Select
                            the minimum amount of days*</label>
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
                        <label className="label has-text-primary has-text-weight-medium">Would you prefer to do
                            Workntour Solo
                            or with Friends or as a couple*</label>
                        <div className={"control"}>
                            <div className={"select is-fullwidth"}>
                                <select className={"border-linear has-text-primary"}
                                        {...register("minNumDays", {required: true})}>
                                    {renderTravCompany()}
                                </select>
                            </div>
                            {errors.minNumDays &&
                                <p className={"help is-danger"}>Minimum days is required</p>
                            }
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Tell us how much you would be willing to pay for a yearly subscription
                            (In Euros)*</label>
                        <NumberFormat value={minDays ? minDays : ''}
                                      onValueChange={(value) => updateMinDays(Number(value.value))}
                                      className={"input border-linear"}
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
                        <button className={"button has-text-white background-linear-land"} type={"button"}>
                            Submit
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default TravelerSubscriptionComponent;