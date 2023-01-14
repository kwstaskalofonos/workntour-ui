import React, {forwardRef, useImperativeHandle, useState} from "react";
import {TypeOfHelpNeeded, TypeOfHelpNeededType} from "@src/state/stores/opportunity/models";
import googleIcon from "@src/assets/GoogleIcon.png";

export interface Props {
    ref: any
}

export interface SkillsModalHandler {
    open: () => void,
    close: () => void
}

const SkillsModal: React.FunctionComponent<Props> =
    forwardRef<SkillsModalHandler>((props: {}, ref) => {

        const [isActive, setIsActive] = useState<boolean>(false);


        useImperativeHandle(ref, () => {
            return {
                open: () => {
                    setIsActive(true);
                },
                close: () => {
                    setIsActive(false);
                }
            }
        })

        const renderSkills = () => {
            let array:any[]=[];
            for(const skill in TypeOfHelpNeeded){
                array.push(<span key={"type-of-help-needed-"+skill}
                                className={"tag is-primary m-1 is-light"}
                                 onClick={()=>console.log(skill)}>
                    {TypeOfHelpNeeded[skill as TypeOfHelpNeededType]}
                </span>)
            }
            return array;
        }

        const headerStyle = {
            backgroundColor: "white",
            borderBottom: "2px solid #8970FA"
        }
        const footerStyle = {
            backgroundColor: "white",
            borderTop: "none"
        }

        return (
            <div className={"modal " + (isActive ? "is-active" : "")}>
                <div className="modal-background"></div>
                <div className={"modal-card"}>
                    <header className={"modal-card-head"}
                            style={headerStyle}>
                        <p className="modal-card-title has-text-weight-semibold has-text-primary">Skills</p>
                        <button className="delete" aria-label="close" onClick={() => setIsActive(false)}></button>
                    </header>
                    <section className={"modal-card-body"}>
                        <div className={"is-flex is-justify-content-space-between"}>
                            <p className={"is-size-7 has-text-weight-semibold"}>Add your skills so you can match with
                                the perfect host!
                                Choose a minimum of 3.</p>
                            <p className={"is-size-7 has-text-weight-semibold"}>3/3</p></div>
                        <div className={"field is-grouped is-grouped-multiline mt-4"}
                             style={{borderRadius: "8px", cursor: 'pointer'}}>
                            {renderSkills()}
                        </div>
                    </section>
                    <footer className="modal-card-foot is-justify-content-center"
                            style={footerStyle}>
                        <button className={"button has-text-white has-background-primary"}>
                            Add Skills
                        </button>
                    </footer>
                </div>
            </div>
        )

    });

export default SkillsModal;