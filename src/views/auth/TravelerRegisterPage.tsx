import React, {useEffect, useState} from "react";
import Footer from "@src/views/common/Footer";
import ReactDatePicker from "react-datepicker";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useForm} from "react-hook-form";
import {Traveler} from "@src/state/stores/user/models";
import {registerAsTraveler} from "@src/state/stores/user/operations";
import {useNavigate} from "react-router";
import Header from "@src/views/common/Header";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import Flag from "react-flagkit";
import {toast} from "react-toastify";
// @ts-ignore
import illustration from "@src/assets/signUpAsTrav.svg";
import CustomDateInput from "@src/views/common/CustomDateInput";
import {constructDate} from "@src/utilities/ui";
import InterCom from "@src/views/common/InterCom";

const TravelerRegisterPage:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,getValues} = form;
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [showHiddenFields,setShowHiddenFields] = useState<boolean>(false);
    const navigate = useNavigate();
    const [selected,setSelected] =
        useState<{value:string,label:JSX.Element}>({value:'GR',label:<Flag country="GR" />});

    const [day,setDay] = useState<string>("");
    const [month,setMonth] = useState<string>("");
    const [year,setYear] = useState<string>("");

    const onSubmit:any=(data:Traveler)=>{

        if(day&&month&&year){
            data.birthday=constructDate(day,month,year);
        }
        data.role='TRAVELER';
        data.countryCodeMobileNum=selected.value;
        setIsLoading(true);
        registerAsTraveler(data,setIsLoading)
            .then(()=>{
                form.reset();
                navigate('/check-inbox',{
                    state:{email:data.email}
                });
            });
    }

    return(
        <React.Fragment>
            <InterCom/>
            <Header/>
            <form>
                <section className={"section has-background-primary-light"}>
                    <div className={"columns is-centered"}>
                        <div className={"column is-1"}/>
                        <div className={"column is-3"}>
                            <div className="field mb-5">
                                <h1 className={"title has-text-weight-bold has-text-primary"}>Hello!</h1>
                                <h2 className={"subtitle has-text-weight-bold has-text-info"}>Sign up and start you journey!</h2>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Name*</label>
                                <div className="control">
                                    <input className="input border-linear" type="text"
                                           {...register("name",{required:true})}
                                           placeholder="Enter your name"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Surname*</label>
                                <div className="control">
                                    <input className="input border-linear" type="text"
                                           {...register("surname",{required:true})}
                                           placeholder="Enter your surname"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Email*</label>
                                <div className="control">
                                    <input className="input border-linear" type="text"
                                           {...register("email",{required:true})}
                                           placeholder="Enter your email"/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Sex*</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select {...register("sex")} className={"border-linear"} defaultValue={"Other"}>
                                            <option value={"FEMALE"}>Female</option>
                                            <option value={"MALE"}>Male</option>
                                            <option value={"OTHER"}>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Password*</label>
                                <div className="control">
                                    <input className="input border-linear" type="password"
                                           {...register("password",{required:true})}
                                           placeholder="Enter your password"/>
                                </div>
                                <p className="help has-text-grey-light">Mixture of both uppercase and lowercase letters.
                                    A mixture of letters and numbers. Inclusion of at least one special character,
                                    (, ! @ # ? ]).</p>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Password Confirm*</label>
                                <div className="control">
                                    <input className="input border-linear" type="password" placeholder="Confirm your password"
                                        {...register("confirmPassword",{required:true,validate:value => value === getValues("password")})}/>
                                </div>
                            </div>
                            <CustomDateInput day={day} month={month} year={year}
                                setDay={setDay} setMonth={setMonth} setYear={setYear}/>
                            <div className={"is-flex is-justify-content-space-between is-align-items-center mt-5"}
                                 onClick={()=>setShowHiddenFields(!showHiddenFields)}>
                                <p>Optional Fields</p>
                                {showHiddenFields?
                                    <FontAwesomeIcon className={"is-right"} icon={faAngleUp}/>:
                                    <FontAwesomeIcon className={"is-right"} icon={faAngleDown}/>
                                }
                            </div>
                            <hr className={"mt-2"} style={{backgroundColor:"#E0E0E0",height:"1px"}}/>
                            {showHiddenFields &&
                                <React.Fragment>
                                    <div className={"field"}>
                                        <label className="label has-text-primary has-text-weight-medium">Phone Number</label>
                                        <div className="control">
                                            <div className="field has-addons">
                                                <CustomSelectCountry value={selected} setValue={setSelected}/>
                                                <p className="control is-expanded">
                                                    <input className="input border-linear-no-left" type="text"
                                                           {...register("mobileNum")} placeholder="+30 694 435 8945"/>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="help has-text-grey-light">For delivery/collection notifications.</p>
                                    </div>
                                    <div className={"field"}>
                                        <label className="label has-text-primary has-text-weight-medium">Nationality</label>
                                        <div className="control">
                                            <input className="input border-linear" type="text"
                                                   {...register("nationality")} placeholder="Enter your nationality"/>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            <div className="field">
                                <button className={"button is-primary is-fullwidth "+(isLoading?"is-loading":"")}
                                        onClick={handleSubmit(onSubmit)} type={"button"}>
                                    Sign Up</button>
                            </div>
                        </div>
                        <div className={"column is-2"}/>
                        <div className={"column is-4"}>
                            <figure className={"image is-4by5"}>
                                <img src={illustration}/>
                            </figure>
                        </div>
                    </div>
                </section>
            </form>
            <Footer/>
        </React.Fragment>
    )
};

export default TravelerRegisterPage;