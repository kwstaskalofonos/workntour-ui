import React, {useEffect, useRef, useState} from "react";
import {GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox, LoadScript} from '@react-google-maps/api'


const CustomMap:React.FunctionComponent = () =>{


    const loader  = useJsApiLoader({
        // @ts-ignore
        googleMapsApiKey: __API_KEY__,
        libraries:["places"]
    });

    const [location,setLocation] = useState({lat:37.4415,lng:25.3667})
    const [center,setCenter] = useState({lat:37.4415,lng:25.3667})

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const getLocation = (latLng:google.maps.LatLng|null) =>{
        if(latLng && latLng.lng() && latLng.lat()){
            let tmp = {lat:latLng?.lat(),lng:latLng?.lng()};
            setLocation(tmp);
        }
    }

    return(
        <React.Fragment>
            {/*{loader.isLoaded &&*/}
            {/*    <GoogleMap*/}

            {/*        mapContainerStyle={containerStyle}*/}
            {/*        zoom={8}*/}
            {/*        center={center}*/}

            {/*        onClick={(e)=>getLocation(e.latLng)}>*/}
            {/*        <Marker position={location}/>*/}
            {/*    </GoogleMap>*/}
            {/*}*/}
            <LoadScript
                // @ts-ignore
                googleMapsApiKey={__API_KEY__} libraries={["places"]}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={8}
                    center={center}
                    onClick={(e)=>getLocation(e.latLng)}>
                    <Marker position={location}/>
                    <StandaloneSearchBox>
                        <input className={"input border-linear"}
                            type="text"
                            placeholder="Customized your placeholder"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        />
                    </StandaloneSearchBox>
                </GoogleMap>
            </LoadScript>
        </React.Fragment>
    )
};

export default CustomMap;