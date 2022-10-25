import React, {useEffect, useState} from "react";

interface Props {
    src: any,
    name: string,
    position: string,
}

const PersonDescr: React.FunctionComponent<Props> = ({src, name, position}) => {

    const [showDesc, setShowDesc] = useState<boolean>(false);

    useEffect(()=>{
        console.log(showDesc);
    },[showDesc])

    return (
        <div>
            <div className={"is-flex is-justify-content-center" + (showDesc ? " is-hidden" : "")}>
                <figure className="image is-128x128">
                    <img onMouseOut={() => setShowDesc(false)}
                         onMouseEnter={() => setShowDesc(true)}
                        className="is-rounded" src={src}/>
                </figure>
            </div>
            <div className={"is-flex is-justify-content-center" + (showDesc ? " is-hidden" : "")}>
                <p className={"is-size-6 has-text-weight-bold"}>{name}</p>
            </div>
            <div className={"is-flex is-justify-content-center" + (showDesc ? " is-hidden" : "")}>
                <p className={"is-size-7 has-text-weight-semibold has-text-primary"}>{position}</p>
            </div>

            <div className={"box has-background-primary has-text-white-bis"+ (!showDesc ? " is-hidden" : "")}>
                <p className={"is-size-7"}>Christos holds a degree in<br/>
                Informatics from Athens<br/>University of Economics &<br/>Business. His role on the<br/>
                workntour team is to set the<br/>technical direction for the product development. Christos<br/>
                specializes in Mobile App<br/>Development and has<br/>experience working for tech
                <br/>companies and startups in<br/>Greece</p>
            </div>
        </div>
)
};

export default PersonDescr;