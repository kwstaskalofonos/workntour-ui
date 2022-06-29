import React, {useRef} from "react";
// @ts-ignore
import logo from "@src/assets/Frame.svg";
import SelectRegistrationModal, {SelectRegistrationModalHandler} from "@src/views/auth/SelectRegistrationModal";
import LoginModal, {LoginModalHandler} from "@src/views/auth/LoginModal";
import {deleteCookie, deleteSpecificCookie, hasCookie} from "@src/utilities/cookies";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons/faUserCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TopMenu: React.FunctionComponent = () =>{

    const registrationModalHandler = useRef<SelectRegistrationModalHandler>();
    const loginModalHandler = useRef<LoginModalHandler>();
    const isAuthenticated=hasCookie();

    const logout = () =>{
        deleteCookie();
        deleteSpecificCookie("role");
        deleteSpecificCookie("profile");
        window.location.replace("/");
    }

    return(
        <React.Fragment>
            <nav className="navbar" role="navigation" aria-label="main-navigation">
                <div className="navbar-brand" style={{position:"relative",left:"+4%"}}>
                    <a className="navbar-item" href="/">
                        <img src={logo} width="190" height="28"/>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <a className="navbar-item">Home</a>
                        <a className="navbar-item">About Us</a>
                        <a className="navbar-item">Price</a>
                        <a className="navbar-item">Blog</a>
                        <a className="navbar-item">Contact Us</a>
                        {!isAuthenticated ?
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-outlined"
                                       style={{"border":"1px solid #7E6FD8","color":"#7E6FD8"}}
                                       onClick={()=>loginModalHandler.current?.open()}>Log in</a>
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

                                <div className="navbar-dropdown">
                                    <a className="navbar-item">
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
            <LoginModal ref={loginModalHandler}/>
        </React.Fragment>
    )
};

export default TopMenu;