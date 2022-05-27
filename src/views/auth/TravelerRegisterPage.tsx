import React, {useState} from "react";
import TopMenu from "@src/views/common/TopMenu";
import Footer from "@src/views/common/Footer";
import ReactDatePicker from "react-datepicker";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TravelerRegisterPage:React.FunctionComponent = () =>{

    const [selectedDate,setSelectedDate] = useState<Date|null>();
    const [showHiddenFields,setShowHiddenFields] = useState<boolean>(false);

    return(
        <React.Fragment>
            <div className="columns mb-0" style={{"boxShadow":"0px 4px 18px rgba(0, 0, 0, 0.15)"}}>
                <div className="column container">
                    <TopMenu/>
                </div>
            </div>
            <section className={"section"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-3"}>
                        <div className="field mb-5">
                            <h1 className={"title has-text-weight-bold"}>Sign up</h1>
                            <h2 className={"subtitle has-text-weight-bold has-text-primary"}>as a Traveler</h2>
                        </div>
                        <div className="field">
                            <label className="label">Full Name</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Enter your name"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Enter your email"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="password" placeholder="Enter your password"/>
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
                                    onChange={(date)=>setSelectedDate(date)}/>
                            </div>
                        </div>
                        <div className={"is-flex is-justify-content-space-between is-align-items-center mt-5"}>
                            <p>Optional Fields</p>
                            {showHiddenFields?
                                <FontAwesomeIcon className={"is-right"} icon={faAngleUp}
                                                 onClick={()=>setShowHiddenFields(!showHiddenFields)}/>:
                                <FontAwesomeIcon className={"is-right"} icon={faAngleDown}
                                                 onClick={()=>setShowHiddenFields(!showHiddenFields)}/>
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
                                                  <select>
                                                    <option>+30</option>
                                                    <option>+185</option>
                                                    <option>+70</option>
                                                  </select>
                                                </span>
                                            </p>
                                            <p className="control is-expanded">
                                                <input className="input" type="text" placeholder="Amount of money"/>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="help has-text-grey-light">For delivery/collection notifications.</p>
                                </div>
                                <div className={"field"}>
                                    <label className="label">Nationality</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Enter your nationality"/>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                        <div className="field">
                            <button className={"button is-primary is-fullwidth"}>Create Account</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </React.Fragment>
    )
};

export default TravelerRegisterPage;