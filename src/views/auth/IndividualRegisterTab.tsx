import React, {useState} from "react";
import {useForm} from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import Flag from "react-flagkit";
import Select from "react-select";
import {PropsValue} from "react-select";
import {countries} from "@src/utilities/countries";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";

const IndividualRegisterTab:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,reset} = form;
    const [selectedDate,setSelectedDate] = useState<Date|null>();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [selected,setSelected] = useState<PropsValue<{value:string,label:JSX.Element}>>({value:'GR',label:<Flag country="GR" />});

    return(
        <React.Fragment>
            <div className="field">
                <label className="label">Fullname</label>
                <div className="control">
                    <input className="input" type="text"
                           {...register("name",{required:true})}
                           placeholder="Enter your name"/>
                </div>
            </div>
            <div className="field">
                <label className="label">Surname</label>
                <div className="control">
                    <input className="input" type="text"
                           {...register("surname",{required:true})}
                           placeholder="Enter your surname"/>
                </div>
            </div>
            <div className="field">
                <label className="label">Email</label>
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
            <div className={"field"}>
                <label className="label">Phone Number</label>
                <div className="control">
                    <div className="field has-addons">
                        <CustomSelectCountry
                            value={selected} setValue={setSelected}/>
                        <p className="control is-expanded">
                            <input className="input" type="text"
                                   {...register("mobileNum")} placeholder="Amount of money"/>
                        </p>
                    </div>
                </div>
                <p className="help has-text-grey-light">For delivery/collection notifications.</p>
            </div>
            <div className="field">
                <button className={"button is-primary is-fullwidth "+(isLoading?"is-loading":"")}
                         type={"button"}>
                    Sign Up</button>
            </div>
        </React.Fragment>
    )
};

export default IndividualRegisterTab;