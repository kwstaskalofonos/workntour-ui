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
      const imageStyling: object = {height:"100%", objectFit: "cover", borderRadius: "2%"};

      return (
        <div className={"columns m-6"}>
            <div className={"column"}>
                <img src={fourth} style={imageStyling}/>
            </div>
            <div className={"column"}>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={second} style={imageStyling}/>
                    </div>
                </div>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={fifth} style={{height:"110%", objectFit: "cover", borderRadius: "2%"}}/>
                    </div>
                </div>
            </div>
            <div className={"column"}>
                <img src={first} style={imageStyling}/>
            </div>
            <div className={"column"}>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={third} style={imageStyling}/>
                    </div>
                </div>
                <div className={"columns"}>
                    <div className={"column"}>
                        <img src={six} style={imageStyling}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GalleryComponent;