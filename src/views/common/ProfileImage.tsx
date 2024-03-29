import React, {useEffect, useState} from "react";
import {Role} from "@src/state/stores/user/models";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props{
    defaultImage:any,
    role:Role,
    name:string,
    surname:string,
    completion?:number,
    setFile:any,
    profileImage?:string
}

const ProfileImage:React.FunctionComponent<Props> = ({defaultImage,role,name,surname,
                                                         completion,setFile,profileImage}) =>{

    const [imagePath,setImagePath] = useState<any>();
    const [type,setType] = useState<string>("");

    useEffect(()=>{
        switch (role){
            case Role.TRAVELER:{
                setType("Traveler");
                break;
            }
            case Role.INDIVIDUAL_HOST:{
                setType("Individual");
                break;
            }
            case Role.COMPANY_HOST:{
                setType("Company");
                break;
            }
        }
    },[])

    const image = () =>{
        if(imagePath){
            return imagePath;
        }
        if(profileImage){
            return profileImage;
        }
        return defaultImage;
    }

    const onChange = (event:any) =>{
        let selected = event.target.files[0];
        let reader = new FileReader();
        let imgTag = document.getElementById("profile");
        if(imgTag){
            imgTag.title = selected.name;
            reader.readAsDataURL(selected);
            setFile(selected);
            reader.onload = (event) =>{
                if(event&&event.target&&imgTag){
                    setImagePath(event.target.result);
                }
            }
        }
    }

    const isPerson = () =>{
        return role==Role.TRAVELER||role==Role.INDIVIDUAL_HOST
    }

    const calculateCompletion = () =>{
        if(completion){
            let tmp = Math.ceil(completion);
            if(completion>100){return 100;}
            return tmp;
        }
        return 100
    }

    return(
        <div className={"is-flex"}>
            <figure className={"image is-128x128"}
                    style={{position:'relative'}}>
                <input className={"file-input"} type={"file"} name={"profile"} id={"profile"}
                       style={{width:'100%',height:'100%',zIndex:1}} accept={"image/*"}
                       onChange={(e)=>onChange(e)}/>
                <div className={'border-linear-profile'}
                     style={{width:'100%',height:'100%',
                         position:'absolute',top:'-10px',zIndex:'-1',
                         borderRadius:'50%',padding:'2px'}}>
                    <img className={"is-rounded"} style={{width:'100%',height:'100%',objectFit:'cover'}}
                         src={image()}/>
                </div>
                <span style={{position:'absolute',left:'15px',top:'96px'}}
                      className="tag has-text-white is-info has-text-weight-semibold background-linear is-normal">
                                {completion?calculateCompletion()+'% Complete':'100% Complete'}</span>
                    <div style={{position:'absolute',width:'22%',height:'22%',
                        top:'4px',right:'3px'}}
                        className={"border-plus-button"}/>
                    <FontAwesomeIcon style={{position:'absolute',top:'10px',right:'10px'}}
                    className={"has-text-info"} icon={faPlus}/>
            </figure>
            <div className={"pl-2"} style={{position:'relative'}}>
                <p className="has-text-primary has-text-weight-semibold is-size-4">{name?name:''}</p>
                {isPerson()&&
                    <p className="has-text-primary has-text-weight-semibold is-size-4"
                       style={{position:'absolute',top:'22px'}}>{surname?surname:''}</p>}
                {isPerson()?
                    <span style={{position:'absolute',top:'62px'}}
                          className="tag is-info has-text-weight-semibold">{type}</span>:
                    <span style={{position:'absolute',top:'62px',marginTop:'-24px'}}
                          className="tag is-info has-text-weight-semibold">{type}</span>}
            </div>
        </div>
    )
};

export default ProfileImage;