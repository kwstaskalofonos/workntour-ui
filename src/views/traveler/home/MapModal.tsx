import React from "react";
import {FilterCoordinates} from "@src/state/stores/opportunity/models";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import {useNavigate} from "react-router";

interface Props{
    active:boolean,
    setActive:any,
    coordinates:FilterCoordinates[]|[],
    center:any
}

const MapModal:React.FunctionComponent<Props> = ({active,setActive,coordinates,center}) =>{

    const navigate = useNavigate();

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const goToOpportunity = (opportunityId:string) =>{
        navigate('/opportunity/'+opportunityId);
    }

    const renderMarkers = () =>{
        let array:any[]=[];
        for(let coordinate of coordinates){
            let location = {lat:coordinate.latitude,lng:coordinate.longitude};
            array.push(<Marker position={location} onClick={()=>goToOpportunity(coordinate.opportunityId)}/>)
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