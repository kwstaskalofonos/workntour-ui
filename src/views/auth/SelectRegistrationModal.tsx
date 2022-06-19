import React from "react";
import { forwardRef, useImperativeHandle, useState} from "react";
import {useNavigate} from "react-router";

export interface Props{
    ref:any
}

export interface SelectRegistrationModalHandler{
    open:()=>void,
    close:()=>void
}

const SelectRegistrationModal:React.FunctionComponent<Props>
    =forwardRef<SelectRegistrationModalHandler>((props, ref:React.Ref<SelectRegistrationModalHandler>)=>{

    const [isActive,setIsActive] = useState<boolean>(false);
    const navigate = useNavigate();

    useImperativeHandle(ref,()=>{
        return{
            open:()=>{
                setIsActive(true);
            },
            close:()=>{
                setIsActive(false);
            }
        }
    })

    const goToTravelerRegPage = () =>{
        navigate('/registerAsTraveler');
        setIsActive(false);
    }

    const goToHostRegPage = () =>{
        navigate('/registerAsHost');
        setIsActive(false);
    }

    return(
        <div className={"modal "+(isActive?"is-active":'')}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Sign Up</p>
                    <button className="delete" aria-label="close" onClick={()=>setIsActive(false)}></button>
                </header>
                <section className="modal-card-body">
                    <p className={"subtitle"}>Choose your option to sing up</p>
                    <div className={"columns is-centered"}>
                        <div className={"column is-4"}>
                            <button className="button is-primary is-fullwidth" onClick={()=>goToTravelerRegPage()}>
                                Traveler</button>
                        </div>
                        <div className={"column is-4"}>
                            <button className="button is-primary is-fullwidth" onClick={()=>goToHostRegPage()}>
                                Host</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
})

export default SelectRegistrationModal;