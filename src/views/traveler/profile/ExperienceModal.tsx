import React from "react";

export interface Props{
    setActive:any
}

const ExperienceModal: React.FunctionComponent<Props> = ({setActive}) => {

    const headerStyle={
        backgroundColor:"white",
        borderBottom:"2px solid #8970FA"
    }
    const footerStyle={
        backgroundColor:"white",
        borderTop:"none"
    }

    return(
        <div className={"modal is-active"}>
            <div className="modal-background"></div>
            <div className={"modal-card"}>
                <header className={"modal-card-head"}
                        style={headerStyle}>
                    <p className="modal-card-title has-text-weight-semibold has-text-primary">Experience</p>
                    <button className="delete" aria-label="close" onClick={() => setActive(false)}></button>
                </header>
                <section className={"modal-card-body"}>
                    <div className={"is-flex is-justify-content-center"}>
                        <div className="field">
                            <input className="is-checkradio is-circle has-background-info is-info" id="exampleCheckboxDefaultCircle1" type="checkbox"
                                   name="exampleCheckboxDefaultCircle1" checked={true}/>
                                <label htmlFor="exampleCheckboxDefaultCircle1">Professional</label>
                        </div>
                        <div className="field">
                            <input className="is-checkradio is-circle has-background-info is-info" id="exampleCheckboxDefaultCircle2" type="checkbox"
                                   name="exampleCheckboxDefaultCircle2" />
                            <label htmlFor="exampleCheckboxDefaultCircle2">Education</label>
                        </div>
                    </div>
                    <div className={"field is-horizontal"}>
                        <div className={"field-body"}>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Company*</label>
                                <div className="control">
                                    <input className={"input border-linear"} placeholder={"Enter your company"}
                                           type={"text"}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Position*</label>
                                <div className="control">
                                    <input className={"input border-linear"} placeholder={"Enter your position"}
                                           type={"text"} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"field is-horizontal"}>
                        <div className={"field-body"}>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Start Date*</label>
                                <div className="control">
                                    <input className={"input border-linear"} placeholder={"Enter your company"}
                                           type={"date"} pattern={'yyyy-MM-dd'} lang={"fr-CA"}
                                           onChange={(event)=>console.log(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">End Date*</label>
                                <div className="control">
                                    <input className={"input border-linear"} placeholder={"Enter your position"}
                                           type={"date"} pattern={'yyyy-MM-dd'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"field"}>
                        <label className="label has-text-primary has-text-weight-medium">Description</label>
                        <div className={"control"}>
                                    <textarea className={"textarea border-linear"}></textarea>
                        </div>
                    </div>
                    <p className={"is-size-7 has-text-weight-semibold"}>By adding your background, you will increase your chances of being accepted by a host.</p>
                </section>
                <footer className="modal-card-foot is-justify-content-center"
                        style={footerStyle}>
                    <button className={"button has-text-white has-background-primary"}>
                        Add Experience
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default ExperienceModal;