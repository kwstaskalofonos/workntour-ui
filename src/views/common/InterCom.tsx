import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons/faCommentDots";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {faMessage} from "@fortawesome/free-solid-svg-icons/faMessage";

const InterCom:React.FunctionComponent = () =>{

    const [isOpened,setIsOpened] = useState<boolean>(false);

    return(
        <React.Fragment>
            {isOpened &&
                <div style={{position:'fixed',
                    zIndex:'35351535453',
                    bottom:'100px',
                    backgroundColor:'white',
                    right:'20px',
                    height:'600px',
                    width:'380px',
                    borderRadius:'10px',
                    boxShadow:'0 1px 6px 0 rgb(0 0 0/6%), 0 2px 32px 0 rgb(0 0 0/16%)',
                transition:'width 200ms ease 0s, height ease 0s, max-height ease 0'}}>
                        <div className={"has-background-primary"} style={{
                            height:'230px',
                            borderTopLeftRadius:'10px',
                            borderTopRightRadius:'10px'
                        }}>
                            <div className={'ml-5'}>
                                <p className="title is-3 is-spaced has-text-white has-text-weight-normal pt-5">Say Hi!
                                    &nbsp;&nbsp;<FontAwesomeIcon icon={faMessage} color={'white'}/></p>
                                <p className="subtitle is-6 has-text-white has-text-weight-normal">Welcome to Work n Tour.
                                    <br/>This is Work n Tour support.<br/>If you have any problem, contact us</p>
                            </div>
                        </div>
                </div>
            }
            <div className={"has-background-primary"}
                 style={{position:'fixed',
                     zIndex:'35351535453',
                     bottom:'20px',
                     right:'20px',
                     height:'60px',
                     cursor:'pointer',
                     borderRadius:'50%',
                     boxShadow:'0 1px 6px 0 rgb(0 0 0/6%), 0 2px 32px 0 rgb(0 0 0/16%)'}}>
                <div className={"is-flex is-align-items-center p-4"}
                     style={{opacity:1,
                         transform:'rotate(0deg) scale(1)',height:'100%'}}>
                    <FontAwesomeIcon color={'white'} onClick={()=>setIsOpened(!isOpened)}
                                     icon={isOpened?faAngleDown:faCommentDots}
                                     fontSize={isOpened?'25px':'25px'} width={25} height={25}/></div>
            </div>
        </React.Fragment>
    )
};

export default InterCom;