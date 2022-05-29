import React, {useState} from "react";
import {useForm} from "react-hook-form";
import ReactDatePicker from "react-datepicker";

const CompanyRegisterTab:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,reset} = form;
    const [selectedDate,setSelectedDate] = useState<Date|null>();
    const [isLoading,setIsLoading] = useState<boolean>(false);

    return(
        <React.Fragment>
            <div className="field">
                <label className="label">Company Name</label>
                <div className="control">
                    <input className="input" type="text"
                           {...register("name",{required:true})}
                           placeholder="Enter your Company name"/>
                </div>
            </div>
            <div className="field">
                <label className="label">Email Address</label>
                <div className="control">
                    <input className="input" type="text"
                           {...register("email",{required:true})}
                           placeholder="Enter your email"/>
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" type="password"
                           {...register("password",{required:true})}
                           placeholder="Enter your password"/>
                </div>
                <p className="help has-text-grey-light">Must be at least 8 characters.</p>
            </div>
            <div className="field">
                <label className="label">Password Confirm</label>
                <div className="control">
                    <input className="input" type="password" placeholder="Enter your password"/>
                </div>
            </div>
            <div className="field">
                <label className="label">Age</label>
                <div className="control">
                    <ReactDatePicker
                        className={"input"}
                        selected={selectedDate}
                        {...register("birthday")}
                        dateFormat={"yyyy-MM-dd"}
                        placeholderText={"Select your Birthday Date"}
                        onChange={(date)=>setSelectedDate(date)}/>
                </div>
            </div>
            <div className="field">
                <label className="label">Company VAT Number</label>
                <div className="control">
                    <input className="input" type="text"
                           {...register("email",{required:true})}
                           placeholder="Enter your email"/>
                </div>
            </div>
            <div className="field">
                <button className={"button is-primary is-fullwidth "+(isLoading?"is-loading":"")}
                        type={"button"}>
                    Sign Up</button>
            </div>
        </React.Fragment>
    )
};

export default CompanyRegisterTab;