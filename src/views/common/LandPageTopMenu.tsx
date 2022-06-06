import React from "react";
// @ts-ignore
import logo from "@src/assets/Frame.svg";

const LandPageTopMenu: React.FunctionComponent = () =>{

    const scrollToBottom = () =>{
        // @ts-ignore
        document.getElementById("langPageEmail").scrollIntoView({behavior:'smooth'});
    }

    return(
        <nav className="navbar" role="navigation" aria-label="main-navigation">
            <div className="navbar-brand" style={{position:"relative",left:"+4%"}}>
                <a className="navbar-item" href="https://bulma.io">
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
                    <div className="navbar-item">
                        <div className="buttons">
                            <span className={"is-italic"}>Do you want to share your culture?</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="button is-outlined is-expanded" style={{"border":"1px solid #7E6FD8","color":"#7E6FD8"}}
                            onClick={()=>scrollToBottom()}>Yes,I'm in!</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default LandPageTopMenu;