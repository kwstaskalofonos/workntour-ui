import React from "react";
// @ts-ignore
import profilePhoto from "@src/assets/profilephoto.png";
import {useAppSelector} from "@src/state/stores/hooks";
import {TravelerProfile} from "@src/state/stores/user/models";

const TravelerProfileImage:React.FunctionComponent = () =>{

    const userProfile = useAppSelector((state)=> state.session.authenticationSlice.profile as unknown as TravelerProfile);

    return(
        <div className={"is-flex"}>
            <figure className={"image is-128x128"}
                    style={{position:'relative'}}>
                <img className={"is-rounded"} src={profilePhoto}/>
                <div className={'border-linear-profile'}
                     style={{width:'100%',height:'100%',
                         position:'relative',top:'-136px',zIndex:'-1',
                         borderRadius:'50%'}}/>
                <span style={{position:'absolute',left:'15px',top:'96px'}}
                      className="tag has-text-white is-info has-text-weight-semibold background-linear is-normal">
                                100% Complete</span>
            </figure>
            <div className={"pl-2"} style={{position:'relative'}}>
                <p className="has-text-primary has-text-weight-semibold is-size-4">{userProfile?userProfile.name:''}</p>
                <p className="has-text-primary has-text-weight-semibold is-size-4"
                   style={{position:'absolute',top:'22px'}}>{userProfile&&userProfile.surname}</p>
                <span style={{position:'absolute',top:'62px'}}
                      className="tag is-info has-text-weight-semibold">Traveler</span>
            </div>
        </div>
    )
};

export default TravelerProfileImage;