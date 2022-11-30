import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {TravelerProfileDTO} from "@src/state/stores/user/models";
import {LearningOpportunities, LearningOpportunitiesType} from "@src/state/stores/opportunity/models";

export interface Props{
    ref:any,
    travelerProfile:TravelerProfileDTO,
    setTravelerProfile:any
}

export interface InterestsModalHandler{
    open:()=>void,
    close:()=>void
}

const InterestsModal:React.FunctionComponent<Props> =
    forwardRef<InterestsModalHandler>((props:{travelerProfile:string,setTravelerProfile:any}, ref)=>{

    const [isActive,setIsActive] = useState<boolean>(false);


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

    const renderInterests = () =>{
        let array:any[]=[];
        for(const interest in LearningOpportunities){
            array.push(<span key={"opportunity-category-"+interest}
                             className={"tag is-primary m-1 is-light"}
                             onClick={()=>console.log(interest)}>
                {LearningOpportunities[interest as LearningOpportunitiesType]}
            </span>)
        }
        return array;
    }

    const headerStyle={
        backgroundColor:"white",
        borderBottom:"2px solid #8970FA"
    }
    const footerStyle={
        backgroundColor:"white",
        borderTop:"none"
    }

    return(
        <div className={"modal "+(isActive?"is-active":"")}>
            <div className="modal-background"></div>
            <div className={"modal-card"}>
                <header className={"modal-card-head"}
                style={headerStyle}>
                    <p className="modal-card-title has-text-weight-semibold has-text-primary">Interests</p>
                    <button className="delete" aria-label="close" onClick={()=>setIsActive(false)}></button>
                </header>
                <section className={"modal-card-body"}>
                    <div className={"is-flex is-justify-content-space-between"}>
                        <p className={"is-size-7 has-text-weight-semibold"}>Add your interests so you can match with the perfect host!
                            Choose a minimum of 3.</p>
                        <p className={"is-size-7 has-text-weight-semibold"}>3/3</p></div>
                    <div className={"field is-grouped is-grouped-multiline mt-4"}
                         style={{borderRadius:"8px",cursor:'pointer'}}>
                        {renderInterests()}
                    </div>
                </section>
                <footer className="modal-card-foot is-justify-content-center"
                style={footerStyle}>
                    <button className={"button has-text-white has-background-primary"}>
                        Add Interests
                    </button>
                </footer>
            </div>
        </div>
    )
});

export default InterestsModal;