import React, {useState} from "react";
import {GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox, LoadScript, InfoWindow} from '@react-google-maps/api'
import {CustomLocation, OpportunityLocation, PlacemarkAttributes} from "@src/state/stores/opportunity/models";


interface Props{
    setOpportunityLocation:any
}

const CustomMap:React.FunctionComponent<Props> = ({ setOpportunityLocation}) =>{


    const loader  = useJsApiLoader({
        // @ts-ignore
        googleMapsApiKey: __API_KEY__
    });

    const [location,setLocation] = useState({lat:37.4415,lng:25.3667})
    const [center,setCenter] = useState({lat:37.4415,lng:25.3667})
    const [searchBox,setSearchBox] = useState(null);
    const [formattedAddress,setFormattedAddress] = useState<string>('');
    const google  = window.google;

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const getMostAccurateResults = (response:google.maps.GeocoderResponse):google.maps.GeocoderAddressComponent[] =>{

        let optimalResults:google.maps.GeocoderAddressComponent[]=[];
        let max=1;
        for(let opt of response.results){
            if(opt.address_components.length>max){
                max = opt.address_components.length;
                optimalResults = opt.address_components;
            }
        }
        return optimalResults;
    }

    const extractFields = (addressComponents:google.maps.GeocoderAddressComponent[]):CustomLocation =>{
        let customLocation:CustomLocation={streetNumber:'',administrativeArea:'',country:'',
            route:'', locality:'',postalCode:''};
        for(let component of addressComponents){
            for(let type of component.types){
                switch (type){
                    case "street_number":{
                        customLocation.streetNumber = component.long_name;
                        break;
                    }
                    case "route":{
                        customLocation.route = component.long_name
                        break;
                    }
                    case "locality":{
                        customLocation.locality = component.long_name
                        break;
                    }
                    case "country":{
                        customLocation.country = component.long_name
                        break;
                    }
                    case "postal_code":{
                        customLocation.postalCode = component.long_name
                        break;
                    }
                }
                if(type.indexOf("administrative_area")>-1){
                    customLocation.administrativeArea = component.long_name;
                }
            }
        }
        return customLocation;
    }

    const formatLocation = (value:CustomLocation) =>{
        let address:string='';
        if(value.route){
            address = address+" "+value.route;
        }
        if(value.streetNumber){
            address = address+" "+value.streetNumber;
        }
        if(value.postalCode){
            address = address+" "+value.postalCode;
        }
        if(value.country){
            address = address+" "+value.country;
        }
        if(value.locality){
            address = address+" "+value.locality;
        }
        if(value.administrativeArea){
            address = address+" "+value.administrativeArea;
        }
        setFormattedAddress(address);
    }

    const getLocation = (latLng:google.maps.LatLng|null) =>{
        if(latLng && latLng.lng() && latLng.lat()){
            let tmp = {lat:latLng?.lat(),lng:latLng?.lng()};
            setLocation(tmp);

            const geocoder = new google.maps.Geocoder();
            // @ts-ignore
            geocoder.geocode({location:latLng})
                .then((value)=>{
                    let addressComponents:google.maps.GeocoderAddressComponent[]=getMostAccurateResults(value);
                    let customLocation = extractFields(addressComponents);
                    formatLocation(customLocation);
                    let oppPlaceMark:PlacemarkAttributes={name:customLocation?.route+" "+customLocation?.streetNumber,postalCode:customLocation?.postalCode,
                    locality:customLocation?.locality,country:customLocation?.country,area:customLocation?.administrativeArea}
                    let oppLocation:OpportunityLocation={placemark:oppPlaceMark,longitude:latLng?.lng().toString(),latitude:latLng?.lat().toString()};
                    setOpportunityLocation(oppLocation);
                })
        }
    }

    const onLocationChanged = () =>{
        if(searchBox){

            // @ts-ignore
            let customLocation:CustomLocation = extractFields(searchBox.getPlaces()[0].address_components);

            // @ts-ignore
            let oppLocation:OpportunityLocation = {latitude:searchBox.getPlaces()[0].geometry.location.lat()};
            // @ts-ignore
            oppLocation.longitude=searchBox.getPlaces()[0].geometry.location.lng()
            let tmp:PlacemarkAttributes={name:customLocation?.route+" "+customLocation?.streetNumber,postalCode:customLocation?.postalCode,
                locality:customLocation?.locality,country:customLocation?.country,area:customLocation?.administrativeArea}
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
                            value={formattedAddress}
                            onChange={(event)=>setFormattedAddress(event.currentTarget.value)}
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