import React, {useRef} from "react";
// @ts-ignore
import logo from "@src/assets/Frame.png";

const TopMenu: React.FunctionComponent = () =>{

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
                    <a className="navbar-item">Home</a>
                    <a className="navbar-item">About Us</a>
                    <a className="navbar-item">Price</a>
                    <a className="navbar-item">Blog</a>
                    <a className="navbar-item">Contact Us</a>
                    <div className="navbar-item">
                    <div className="buttons">
                    <a className="button is-outlined" style={{"border":"1px solid #7E6FD8","color":"#7E6FD8"}}>Log in</a>
                    </div>
                </div>
                </div>
            </div>
        </nav>
    )
};

export default TopMenu;