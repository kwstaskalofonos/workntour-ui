import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
    LanguageProficiency,
    LanguageProficiencyType,
    Languages,
    LanguagesType
} from "@src/state/stores/opportunity/models";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface Props {
    setActive:any
}


const LanguagesModal: React.FunctionComponent<Props> = ({setActive}) => {

        const headerStyle={
            backgroundColor:"white",
            borderBottom:"2px solid #8970FA"
        }
        const footerStyle={
            backgroundColor:"white",
            borderTop:"none"
        }

        const renderLanguages = () => {
            let array: any[] = [];
            array.push(<option key={"language-option-empty"} value={""} label={"Select language"}/>)
            for (const language in Languages) {
                array.push(<option key={"language-option-empty-" + language}
                                   value={language} label={Languages[language as LanguagesType]}>
                    {Languages[language as LanguagesType]}
                </option>)
            }
            return array;
        }

        const renderLevel = () => {
            let array: any[] = [];
            array.push(<option key={"language-option-empty"} value={""} label={"Select the level"}/>)
            for (const level in LanguageProficiency) {
                array.push(<option key={"language-option-empty-" + level}
                                   value={level} label={LanguageProficiency[level as LanguageProficiencyType]}>
                    {LanguageProficiency[level as LanguageProficiencyType]}
                </option>)
            }
            return array;
        }

        return (
            <div className={"modal is-active"}>
                <div className="modal-background"></div>
                <div className={"modal-card"}>
                    <header className={"modal-card-head"}
                            style={headerStyle}>
                        <p className="modal-card-title has-text-weight-semibold has-text-primary">Languages</p>
                        <button className="delete" aria-label="close" onClick={() => setActive(false)}></button>
                    </header>
                    <section className={"modal-card-body"}>
                        <div className={"columns"}>
                            <div className={"column"}>
                                <div className="field">
                                    <label className="label has-text-primary has-text-weight-medium">Languages</label>
                                    <div className={"select is-fullwidth"}>
                                        <select className={"border-linear empty-select"}>
                                            {renderLanguages()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={"column"}>
                                <label className="label has-text-primary has-text-weight-medium">Level</label>
                                <div className={"select is-fullwidth"}>
                                    <select className={"border-linear empty-select"}>
                                        {renderLevel()}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot is-justify-content-center"
                            style={footerStyle}>
                        <button className={"button has-text-white has-background-primary"}>
                            Add Language
                        </button>
                    </footer>
                </div>
            </div>
        );
    }

export default LanguagesModal;