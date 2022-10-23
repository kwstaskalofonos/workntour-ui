import React from 'react';
// @ts-ignore
import first from "@src/assets/newLandingPage/first.png";
// @ts-ignore
import second from "@src/assets/newLandingPage/second.png";
// @ts-ignore
import third from "@src/assets/newLandingPage/third.png";
// @ts-ignore
import fourth from "@src/assets/newLandingPage/fourth.png";
// @ts-ignore
import fifth from "@src/assets/newLandingPage/fifth.png";
// @ts-ignore
import six from "@src/assets/newLandingPage/sixth.png";

const GalleryComponent: React.FunctionComponent = () => {

    return (
        <div className={"columns"}>
            <div className={"column"}>
                <img src={fourth}/>
            </div>
            <div className={"column"}>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={second}/>
                    </div>
                </div>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={fifth}/>
                    </div>
                </div>
            </div>
            <div className={"column"}>
                <img src={first}/>
            </div>
            <div className={"column"}>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={third}/>
                    </div>
                </div>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={six}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GalleryComponent;