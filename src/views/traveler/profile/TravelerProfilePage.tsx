import React, {useEffect, useState} from "react";
import ProfileImage from "@src/views/common/ProfileImage";
import {useAppDispatch, useAppSelector} from "@src/state/stores/hooks";
import {Role, TravelerProfile, TypeOfTraveler, TypeOfTravelerType} from "@src/state/stores/user/models";
import cloneDeep from "lodash/cloneDeep";
import {extractYearMonthDay, getNationalities} from "@src/utilities/ui";
import CustomDateInput from "@src/views/common/CustomDateInput";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
// @ts-ignore
import profilePhoto from "@src/assets/travelerProfile.png";
import Flag from "react-flagkit";
import {countries} from "@src/utilities/countries";
import {updateTravelerProfile} from "@src/state/stores/user/operations";

const TravelerProfilePage:React.FunctionComponent = () =>{

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state)=> state.session.authenticationSlice.profile as unknown as TravelerProfile);
    const [profile,setProfile] = useState<TravelerProfile>();
    const [day,setDay] = useState<string>("");
    const [month,setMonth] = useState<string>("");
    const [year,setYear] = useState<string>("");
    const [selected,setSelected] =
        useState<{value:string,label:JSX.Element}>({value:'GR',label:<Flag country="GR" />});
    const [countryCode,setCountryCode] = useState<string>("30");
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [completion,setCompletion] = useState<number>(0);
    const [initialized,setInitialized] = useState<boolean>(false);
    const [file,setFile] = useState<File>();

    useEffect(()=>{
        setInitialized(true);
        if(userProfile){

            if(userProfile.countryCodeMobileNum){
                let idx = countries.findIndex(value => value.code == userProfile.countryCodeMobileNum);
                if(idx>-1){
                    setSelected({value:countries[idx].value,label:<Flag country={countries[idx].value} />});
                    setCountryCode(userProfile.countryCodeMobileNum);
                }
            }

            const [initialYear,initialMonth,initialDay] = extractYearMonthDay(userProfile.birthday);
            setYear(initialYear);
            setDay(initialDay);
            setMonth(initialMonth);
            let tmp:TravelerProfile = {name:userProfile.name,surname:userProfile.surname
            ,description:userProfile.description,profileImage:userProfile.profileImage,email:userProfile.email,
            memberId:userProfile.memberId,role:userProfile.role,mobileNum:userProfile.mobileNum
                ,nationality:userProfile.nationality,birthday:userProfile.birthday,sex:userProfile.sex,
            postalAddress:userProfile.postalAddress,typeOfTraveler:userProfile.typeOfTraveler,
            countryCodeMobileNum:userProfile.countryCodeMobileNum,profImage:userProfile.profImage}
            setProfile(tmp);

            let completed = 0;

            if(userProfile.nationality){
                completed = completed +14.29;
            }
            if(userProfile.birthday){
                completed = completed +14.29;
            }
            if(userProfile.sex){
                completed = completed +14.29;
            }
            if(userProfile.email){
                completed = completed +14.29;
            }
            if(userProfile.typeOfTraveler){
                completed = completed +14.29;
            }
            if(userProfile.postalAddress){
                completed = completed +14.29;
            }
            if(userProfile.mobileNum){
                completed = completed +14.29;
            }
            setCompletion(completed);

        }
    },[userProfile])

    const renderNationalities = () =>{
        let array:any[]=[];
        array.push(<option key={"nationality-option-empty-1"} value={""} label={"Select Nationality"}/>);
        for(let item of getNationalities()){
            array.push(<option key={"nationality-option-"+item.label}
                               value={item.value} label={item.label}>{item.label}</option>)
        }
        return array;
    }

    const renderTypeOfTraveler = () =>{
        let array:any[]=[];
        array.push(<option key={"category-option-empty"}/>)
        for(const item in TypeOfTraveler){
            array.push(<option key={"type-of-traveler-option-"+item} selected={item == profile?.typeOfTraveler}
            value={item} label={TypeOfTraveler[item as TypeOfTravelerType]}>{TypeOfTraveler[item as TypeOfTravelerType]}
            </option>)
        }
        return array;
    }

    useEffect(()=>{
        if(countryCode&&initialized){
            let tmp = cloneDeep(profile)!;
            tmp.countryCodeMobileNum = countryCode;
            setProfile(tmp);
        }
    },[countryCode])

    const onSelectNationality = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.nationality = value;
        setProfile(tmp);
    }

    const onSelectSex = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.sex = value;
        setProfile(tmp);
    }

    const onChangeEmail = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.email = value;
        setProfile(tmp);
    }

    const onSelectType = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.typeOfTraveler = value;
        setProfile(tmp);
    }

    const onChangePostal = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.postalAddress = value;
        setProfile(tmp);
    }

    const onChangeMobileNum = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.mobileNum = value;
        setProfile(tmp);
    }

    const onSubmit = () =>{

        let formData = new FormData();
        if(file){
            formData.append("profileImage",file);
        }
        formData.append("updatedTravelerProfile",new Blob([JSON.stringify(profile)],{type:"application/json"}));
        setIsLoading(true);
        dispatch(updateTravelerProfile(formData,setIsLoading))
    }

    return(
        <div className={"profile"}>
            <div className={"columns is-centered"}>
                <div className={"column is-1"}></div>
                <div className={"column is-narrow"}>
                    <ProfileImage defaultImage={profilePhoto} role={Role.TRAVELER} setFile={setFile}
                    name={userProfile?userProfile.name:''} surname={userProfile?userProfile.surname:''}
                    completion={completion} profileImage={profile?.profileImage}/>
                </div>
                <div className={"column is-7"}/>
            </div>
            <section>
                <div className={"columns is-centered"}>
                    <div className={"column is-1"}></div>
                    <div className={"column is-4"}>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Name</label>
                            <div className="control">
                                <input className={"input border-linear-disabled"}
                                       disabled type={"text"} value={profile?profile.name:''}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Surname</label>
                            <div className="control">
                                <input className={"input border-linear-disabled"}
                                       disabled type={"text"} value={profile?profile.surname:''}/>
                            </div>
                        </div>
                        <div className={"field"}>
                            <label className="label has-text-primary has-text-weight-medium">Nationality</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select value={profile&&profile.nationality}
                                            onChange={(e)=>onSelectNationality(e.currentTarget.value)}
                                            className={"border-linear"}
                                            placeholder={"Select your Nationality"}>
                                        {renderNationalities()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <CustomDateInput day={day} month={month} year={year} disabled={true}
                                         setDay={setDay} setMonth={setMonth} setYear={setYear}/>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Sex*</label>
                            <div className="select is-fullwidth">
                                <select className={"border-linear"}
                                        onChange={(event)=>onSelectSex(event.currentTarget.value)}>
                                    <option value={"FEMALE"} selected={profile?.sex=="FEMALE"}>Female</option>
                                    <option value={"MALE"} selected={profile?.sex=="MALE"}>Male</option>
                                    <option value={"OTHER"} selected={profile?.sex=="OTHER"}>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"column is-4"}>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Email</label>
                            <div className="control">
                                <input className={"input border-linear-disabled"} disabled={true}
                                       onChange={(event)=>onChangeEmail(event.currentTarget.value)}
                                       type={"text"} value={profile?profile.email:''}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Type of Traveler</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select className={"border-linear"} onChange={(event)=>onSelectType(event.currentTarget.value)}>
                                        {renderTypeOfTraveler()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Postal Address</label>
                            <div className="control">
                                <input className={"input border-linear"}
                                       onChange={(event)=>onChangePostal(event.currentTarget.value)}
                                       type={"text"} value={profile?profile.postalAddress:''}/>
                            </div>
                        </div>
                        <div className={"field"}>
                            <label className="label has-text-primary has-text-weight-medium">Phone Number</label>
                            <div className="control">
                                <div className="field has-addons">
                                    <CustomSelectCountry value={selected} setValue={setSelected} setCountryCode={setCountryCode}/>
                                    <p className="control is-expanded">
                                        <input className="input border-linear-no-left" type="text"
                                               onChange={(event)=>onChangeMobileNum(event.currentTarget.value)}
                                               placeholder="+30 694 435 8945" value={profile?.mobileNum}/>
                                    </p>
                                </div>
                            </div>
                            <p className="help has-text-grey-light">For delivery/collection notifications.</p>
                        </div>
                        <div className="field">
                            <p className="control is-fullwidth">
                                <a className={"button is-primary is-fullwidth "+((isLoading)?"is-loading":'')}
                                   type={"button"} onClick={onSubmit}>
                                    Save
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                </div>
            </section>
        </div>
    )
};

export default TravelerProfilePage;