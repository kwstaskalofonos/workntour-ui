import React from "react";
import TopMenu from "@src/views/common/TopMenu";

const Header:React.FunctionComponent = () =>{

    return(
        <div className="columns mb-0" style={{"boxShadow":"0px 4px 18px rgba(0, 0, 0, 0.15)"}}>
            <div className="column container">
                <TopMenu/>
            </div>
        </div>
    )
};

export default Header;