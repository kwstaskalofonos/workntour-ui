import React, {useEffect, useRef, useState} from "react";
// @ts-ignore
import logo from "@src/assets/Frame.svg";
import SelectRegistrationModal, {SelectRegistrationModalHandler} from "@src/views/auth/SelectRegistrationModal";
import LoginModal, {LoginModalHandler} from "@src/views/auth/LoginModal";
import {deleteCookie, deleteSpecificCookie, hasCookie} from "@src/utilities/cookies";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons/faUserCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getUserDisplayName, isHost} from "@src/utilities/ui";
import {useAppSelector} from "@src/state/stores/hooks";
import {CompanyHostProfile, IndividualHostProfile, Role, TravelerProfileDTO} from "@src/state/stores/user/models";
import {clearRefData, SessionStorage} from "@src/utilities/localStorage";

const TopMenu: React.FunctionComponent = () =>{

    const registrationModalHandler = useRef<SelectRegistrationModalHandler>();
    const loginModalHandler = useRef<LoginModalHandler>();
    const isAuthenticated=hasCookie();
    const role = useAppSelector((state)=>state.session.authenticationSlice.role);
    const userProfile = useAppSelector((state)=>state.session.authenticationSlice.profile);
    const [isActive,setIsActive] = useState<boolean>(false);

    const logout = () =>{
        deleteCookie();
        clearRefData();
        deleteSpecificCookie("role");
        deleteSpecificCookie("profile");
        window.location.replace("/");
    }

    const retrieveName = () =>{
        if(role&&role==Role.COMPANY_HOST.toString()&&userProfile){
            // @ts-ignore
            return userProfile.companyName;
        }
        if(role&&role!=Role.COMPANY_HOST.toString()&&userProfile){
            // @ts-ignore
            return userProfile.name;
        }
    }

    return(
        <React.Fragment>
            <nav className="navbar" role="navigation" aria-label="main-navigation">
                <div className="navbar-brand" style={{position:"relative",left:"+4%"}}>
                    <a className="navbar-item" href="/">
                        {/*<img src={logo} width="190" height="28"/>*/}
                        <img src={logo}/>
                    </a>

                    <a role="button" className={"navbar-burger "+(isActive?"is-active":"")} onClick={()=>setIsActive(!isActive)}
                       aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={"navbar-menu "+(isActive?"is-active":"")}>
                    <div className="navbar-end">
                        {!isAuthenticated &&
                            <React.Fragment>
                                <a className="navbar-item" href="/">Home</a>
                                <a className="navbar-item" href="/about">About Us</a>
                                <a className="navbar-item" href="/blog">Blog</a>
                            </React.Fragment>
                        }
                        {isHost() &&
                            <a className="navbar-item" href={'/'}>Opportunities</a>
                        }
                        {!isAuthenticated ?
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-primary"
                                       onClick={()=>loginModalHandler.current?.open()}>Log In</a>
                                    <a className="button is-outlined"
                                       style={{"border":"1px solid #7E6FD8","color":"#7E6FD8"}}
                                       onClick={()=>registrationModalHandler.current?.open()}>Sign Up</a>
                                </div>
                            </div>:
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    <span className={"icon"}>
                                        <FontAwesomeIcon className={"has-text-primary fa-xl"} icon={faUserCircle}/>
                                    </span>
                                </a>

                                <div className="navbar-dropdown is-right">
                                    <a className="navbar-item">
                                        Singed in as {retrieveName()}
                                    </a>
                                    <hr className="navbar-divider"/>
                                    <a className="navbar-item" href={"profile"}>
                                        Profile
                                    </a>
                                    <hr className="navbar-divider"/>
                                    <a className="navbar-item" onClick={()=>logout()}>
                                        Log out
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
            <SelectRegistrationModal ref={registrationModalHandler}/>
            <LoginModal ref={loginModalHandler} {...{modalHandler:registrationModalHandler}}/>
        </React.Fragment>
    )
};

export default TopMenu;