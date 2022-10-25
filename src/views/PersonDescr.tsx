import React, {useEffect, useState} from "react";

interface Props {
    src: any,
    name: string,
    position: string,
    description:any
}

const PersonDescr: React.FunctionComponent<Props> = ({src, name, position,description}) => {

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
                {description}
            </div>
        </div>
)
};

export default PersonDescr;