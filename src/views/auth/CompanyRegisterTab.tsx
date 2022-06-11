import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons/faCloudUpload";

const CompanyRegisterTab:React.FunctionComponent = () =>{

    const form = useForm();
    const {register,handleSubmit,reset} = form;
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [showHiddenFields,setShowHiddenFields] = useState<boolean>(false);

    return(
        <React.Fragment>
            <div className="field">
                <label className="label has-text-primary has-text-weight-medium">Company Name*</label>
                <div className="control">
                    <input className="input border-linear" type="text"
                           {...register("name",{required:true})}
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
                <p className="help has-text-grey-light">Must be at least 8 characters.</p>
            </div>
            <div className="field">
                <label className="label has-text-primary has-text-weight-medium">Password Confirm*</label>
                <div className="control">
                    <input className="input border-linear" type="password" placeholder="Enter your password"/>
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
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Company VAT Number</label>
                        <div className="control">
                            <input className="input border-linear" type="text"
                                   {...register("email",{required:true})}
                                   placeholder="Enter your company VAT Number"/>
                        </div>
                    </div>
                    <div className={"field"}>
                        <label className="label has-text-primary has-text-weight-medium">
                            Authorized Person Document
                        </label>
                        <div className="file is-large is-boxed is-fullwidth">
                            <label className="file-label">
                                <input className="file-input border-linear" type="file" name="resume"/>
                                    <span className="file-cta">
                                      <FontAwesomeIcon className={"has-text-primary"} icon={faCloudUpload}/>
                                      <span className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold">
                                        Click to upload you file</span>
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
                        type={"button"}>
                    Sign Up</button>
            </div>
        </React.Fragment>
    )
};

export default CompanyRegisterTab;