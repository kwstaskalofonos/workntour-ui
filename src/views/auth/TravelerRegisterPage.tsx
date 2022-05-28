import React, {useState} from "react";
import TopMenu from "@src/views/common/TopMenu";
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

const TravelerRegisterPage:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,reset} = form;
    const [selectedDate,setSelectedDate] = useState<Date|null>();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [showHiddenFields,setShowHiddenFields] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit:any=(data:Traveler)=>{

        if(selectedDate){
            let tempDate = selectedDate.toISOString();
            let idx = tempDate.indexOf('T');
            data.birthday=tempDate.substring(0,idx);
        }
        data.role='TRAVELER';
        setIsLoading(true);
        registerAsTraveler(data,setIsLoading)
            .then(()=>{
                form.reset();
                navigate('/check-inbox');
            }).catch((error)=>{

        });
    }

    return(
        <React.Fragment>
            <Header/>
            <form>
                <section className={"section"}>
                    <div className={"columns is-centered"}>
                        <div className={"column is-3"}>
                            <div className="field mb-5">
                                <h1 className={"title has-text-weight-bold"}>Sign up</h1>
                                <h2 className={"subtitle has-text-weight-bold has-text-primary"}>as a Traveler</h2>
                            </div>
                            <div className="field">
                                <label className="label">Name</label>
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
                                <label className="label">Sex</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select {...register("sex")} defaultValue={"Other"}>
                                            <option value={"FEMALE"}>Female</option>
                                            <option value={"MALE"}>Male</option>
                                            <option value={"OTHER"}>Other</option>
                                        </select>
                                    </div>
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
                                <label className="label">What is your date of birthday?</label>
                                <div className="control">
                                    <ReactDatePicker
                                        className={"input"}
                                        selected={selectedDate}
                                        {...register("birthday")}
                                        dateFormat={"yyyy-MM-dd"}
                                        onChange={(date)=>setSelectedDate(date)}/>
                                </div>
                            </div>
                            <div className={"is-flex is-justify-content-space-between is-align-items-center mt-5"}
                                 onClick={()=>setShowHiddenFields(!showHiddenFields)}>
                                <p>Optional Fields</p>
                                {showHiddenFields?
                                    <FontAwesomeIcon className={"is-right"} icon={faAngleUp}/>:
                                    <FontAwesomeIcon className={"is-right"} icon={faAngleDown}/>
                                }
                            </div>
                            <hr className={"mt-2"}/>
                            {showHiddenFields &&
                                <React.Fragment>
                                    <div className={"field"}>
                                        <label className="label">Phone Number</label>
                                        <div className="control">
                                            <div className="field has-addons">
                                                <p className="control">
                                                <span className="select">
                                                  <select {...register("countryCodeMobileNum")} defaultValue={"+30"}>
                                                    <option>+30</option>
                                                    <option>+185</option>
                                                    <option>+70</option>
                                                  </select>
                                                </span>
                                                </p>
                                                <p className="control is-expanded">
                                                    <input className="input" type="text"
                                                           {...register("mobileNum")} placeholder="Amount of money"/>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="help has-text-grey-light">For delivery/collection notifications.</p>
                                    </div>
                                    <div className={"field"}>
                                        <label className="label">Nationality</label>
                                        <div className="control">
                                            <input className="input" type="text"
                                                   {...register("nationality")} placeholder="Enter your nationality"/>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                            <div className="field">
                                <button className={"button is-primary is-fullwidth "+(isLoading?"is-loading":"")}
                                        onClick={handleSubmit(onSubmit)} type={"button"}>
                                    Create Account</button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <Footer/>
        </React.Fragment>
    )
};

export default TravelerRegisterPage;