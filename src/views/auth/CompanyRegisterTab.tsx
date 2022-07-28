import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons/faCloudUpload";
import {Company} from "@src/state/stores/user/models";
import {registerAsCompany} from "@src/state/stores/user/operations";
import {useNavigate} from "react-router";

const CompanyRegisterTab:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,getValues} = form;
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [showHiddenFields,setShowHiddenFields] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit:any=(data:Company)=>{
        setIsLoading(true);
        registerAsCompany(data,setIsLoading)
            .then(()=>{
               form.reset();
                navigate('/check-inbox',{state:{
                        email:data.email
                    }});
            });
    }

    return(
        <form>
            <div className="field">
                <label className="label has-text-primary has-text-weight-medium">Company Name*</label>
                <div className="control">
                    <input className="input border-linear" type="text"
                           {...register("companyName",{required:true})}
                           placeholder="Enter your Company name"/>
                </div>
            </div>
            <div className="field">
                <label className="label has-text-primary has-text-weight-medium">Email Address*</label>
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
            <div className="field">
                <label className="label has-text-primary has-text-weight-medium">Company VAT Number*</label>
                <div className="control">
                    <input className="input border-linear" type="text"
                           {...register("companyId",{required:true,maxLength:9,minLength:9})}
                           placeholder="Enter your company VAT Number"/>
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
            <hr className={"mt-2"} style={{backgroundColor:"#E0E0E0",height:"1px"}}/>
            {showHiddenFields &&
                <React.Fragment>
                    <div className={"field"}>
                        <label className="label has-text-primary has-text-weight-medium">
                            Authorized Person Document
                        </label>
                        <div className="file is-large is-boxed is-fullwidth">
                            <label className="file-label border-linear-radius">
                                <input className="file-input" type="file" name="resume"/>
                                    <span className="file-cta">
                                      <FontAwesomeIcon className={"has-text-primary"} icon={faCloudUpload}/>
                                      <span className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold">
                                        Click to upload your file</span>
                                        <p className="file-label has-text-primary has-text-centered is-size-6 has-text-weight-light">
                                        SVG,PNG,JPG or GIF (max. 800x400px)
                                      </p>
                                    </span>
                            </label>
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

export default CompanyRegisterTab;