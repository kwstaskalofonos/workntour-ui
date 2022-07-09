import React, {useEffect, useRef, useState} from "react";
import {GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox, LoadScript} from '@react-google-maps/api'
import {OpportunityLocation, PlacemarkAttributes} from "@src/state/stores/opportunity/models";

interface Props{
    setOpportunityLocation:any
}

const CustomMap:React.FunctionComponent<Props> = ({ setOpportunityLocation}) =>{


    const loader  = useJsApiLoader({
        // @ts-ignore
        googleMapsApiKey: __API_KEY__,
        libraries:["places"]
    });

    const [location,setLocation] = useState({lat:37.4415,lng:25.3667})
    const [center,setCenter] = useState({lat:37.4415,lng:25.3667})
    const [searchBox,setSearchBox] = useState(null);

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

    const onLocationChanged = () =>{
        if(searchBox){
            //searchBox.getPlaces()[0].address_components[1]+searchBox.getPlaces()[0].address_components[0] Name
            //searchBox.getPlaces()[0].address_components[3] administrative area
            //searchBox.getPlaces()[0].address_components[4] Country
            //searchBox.getPlaces()[0].address_components[5] postal code
            //searchBox.getPlaces()[0].address_components[2] locality

            //searchBox.getPlaces()[0].geometry.location.lat()
            //searchBox.getPlaces()[0].geometry.location.lng()

            // @ts-ignore
            let tmp:PlacemarkAttributes={name:searchBox.getPlaces()[0].address_components[1].long_name+" "+searchBox.getPlaces()[0].address_components[0].long_name};
            // @ts-ignore
            tmp.area=searchBox.getPlaces()[0].address_components[3].long_name;
            // @ts-ignore
            tmp.country = searchBox.getPlaces()[0].address_components[4].long_name;
            // @ts-ignore
            tmp.locality = searchBox.getPlaces()[0].address_components[2].long_name;
            // @ts-ignore
            tmp.postalCode = searchBox.getPlaces()[0].address_components[5].long_name;

            // @ts-ignore
            let oppLocation:OpportunityLocation = {latitude:searchBox.getPlaces()[0].geometry.location.lat()};
            // @ts-ignore
            oppLocation.longitude=searchBox.getPlaces()[0].geometry.location.lng()
            oppLocation.placemark = tmp;

            setOpportunityLocation(oppLocation);

            let location = {lat:Number(oppLocation.latitude),lng:Number(oppLocation.longitude)};
            setLocation(location);
            setCenter(location);
        }
    }

    const onSBLoad = (ref:any) =>{
        setSearchBox(ref);
    }

    return(
        <React.Fragment>
            <LoadScript
                // @ts-ignore
                googleMapsApiKey={__API_KEY__}
                libraries={["places"]}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={14}
                    center={center}
                    onClick={(e)=>getLocation(e.latLng)}>
                    <Marker position={location}/>
                    <StandaloneSearchBox
                        onLoad={onSBLoad}
                        onPlacesChanged={()=>onLocationChanged()}>
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