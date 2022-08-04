import React from "react";
import {FilterCoordinates} from "@src/state/stores/opportunity/models";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props{
    active:boolean,
    setActive:any,
    coordinates:FilterCoordinates[]|[],
    center:any
}

const MapModal:React.FunctionComponent<Props> = ({active,setActive,coordinates,center}) =>{


    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const renderMarkers = () =>{
        let array:any[]=[];
        for(let coordinate of coordinates){
            let location = {lat:coordinate.latitude,lng:coordinate.longitude};
            // @ts-ignore
            array.push(<Marker position={location} icon={<FontAwesomeIcon icon={faHouse}/>}/>)
        }
        return array;
    }

    return(
        <div className={"modal "+(active?"is-active":'')}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className={"modal-card-head"}>
                    <button className="delete" aria-label="close" onClick={()=>setActive(false)}></button>
                </header>
                <section className="modal-card-body">
                    <LoadScript
                        // @ts-ignore
                        googleMapsApiKey={__API_KEY__}
                        libraries={["places"]}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            zoom={8}
                            center={center}>
                            {renderMarkers()}
                        </GoogleMap>
                    </LoadScript>
                </section>
            </div>
        </div>
    )
};

export default MapModal;