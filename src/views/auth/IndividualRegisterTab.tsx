import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Flag from "react-flagkit";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import CustomDateInput from "@src/views/common/CustomDateInput";
import {Individual} from "@src/state/stores/user/models";
import {constructDate, getNationalities} from "@src/utilities/ui";
import {registerAsIndividual} from "@src/state/stores/user/operations";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const IndividualRegisterTab:React.FunctionComponent = () =>{

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
    const [countryCode,setCountryCode] = useState<string>("30");

    const onSubmit:any=(data:Individual)=>{
        if(day&&month&&year){
            data.birthday=constructDate(day,month,year);
        }
        data.countryCodeMobileNum=countryCode;
        if(data.nationality==""){
            toast.error("Please select Nationality",{position:toast.POSITION.TOP_RIGHT});
            return;
        }
        setIsLoading(true);
        registerAsIndividual(data,setIsLoading)
            .then(()=>{
                form.reset();
                navigate('/check-inbox',{state:{
                    email:data.email
                    }});
            });
    }

    const renderNationalities = () =>{
        let array:any[]=[];
        array.push(<option key={"nationality-option-empty-1"} value={""} label={"Select Nationality"}/>);
        for(let item of getNationalities()){
            array.push(<option key={"type-of-help-option-"+item.label}
                               value={item.value} label={item.label}/>)
        }
        return array;
    }

    return(
        <form>
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
                <label className="label has-text-primary has-text-weight-medium">Confirmation*</label>
                <div className="control">
                    <input className="input border-linear" type="password" placeholder="Confirm your password"
                           {...register("confirmPassword",{required:true,validate:value => value === getValues("password")})}/>
                </div>
            </div>
            <CustomDateInput day={day} month={month} year={year} setDay={setDay}
                setMonth={setMonth} setYear={setYear}/>
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
                                <CustomSelectCountry value={selected} setValue={setSelected} setCountryCode={setCountryCode}/>
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
                            <div className="select is-fullwidth">
                                <select
                                    {...register("nationality")}
                                    className={"border-linear has-text-primary"}
                                    placeholder={"Select your Nationality"}>
                                    {renderNationalities()}
                                </select>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
            <div className="field">
                <button className={"button is-primary is-fullwidth "+(isLoading?"is-loading":"")}
                         type={"button"} onClick={handleSubmit(onSubmit)}>
                    Sign Up</button>
            </div>
        </form>
    )
};

export default IndividualRegisterTab;