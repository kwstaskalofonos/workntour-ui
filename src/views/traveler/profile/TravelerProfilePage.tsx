import React, {useEffect, useState} from "react";
import TravelerProfileImage from "@src/views/traveler/profile/TravelerProfileImage";
import {useAppSelector} from "@src/state/stores/hooks";
import {TravelerProfile, TypeOfTraveler, TypeOfTravelerType} from "@src/state/stores/user/models";
import cloneDeep from "lodash/cloneDeep";
import {extractYearMonthDay, getNationalities} from "@src/utilities/ui";
import CustomDateInput from "@src/views/common/CustomDateInput";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import Flag from "react-flagkit";
import {countries} from "@src/utilities/countries";

const TravelerProfilePage:React.FunctionComponent = () =>{

    const userProfile = useAppSelector((state)=> state.session.authenticationSlice.profile as unknown as TravelerProfile);
    const [profile,setProfile] = useState<TravelerProfile>();
    const [day,setDay] = useState<string>("");
    const [month,setMonth] = useState<string>("");
    const [year,setYear] = useState<string>("");
    const [selected,setSelected] =
        useState<{value:string,label:JSX.Element}>({value:'GR',label:<Flag country="GR" />});
    const [countryCode,setCountryCode] = useState<string>("30");

    useEffect(()=>{
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
            countryCodeMobileNum:userProfile.countryCodeMobileNum}
            setProfile(tmp);

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

    const onSelectNationality = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.nationality = value;
        setProfile(tmp);
    }

    return(
        <section className={"mt-4"}>
            <div className={"columns is-centered"}>
                <div className={"column is-1"}></div>
                <div className={"column is-4"}>
                    <TravelerProfileImage/>
                    <div className="field mt-4">
                        <label className="label has-text-primary has-text-weight-medium">Name</label>
                        <div className="control">
                            <input className={"input"}
                                   disabled type={"text"} value={profile?profile.name:''}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Surname</label>
                        <div className="control">
                            <input className={"input"}
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
                    <CustomDateInput day={day} month={month} year={year}
                                     setDay={setDay} setMonth={setMonth} setYear={setYear}/>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Sex*</label>
                            <div className="select is-fullwidth">
                                <select className={"border-linear"}>
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
                            <input className={"input border-linear"}
                                   type={"text"} value={profile?profile.email:''}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Type of Traveler</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select className={"border-linear"}>
                                    {renderTypeOfTraveler()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label has-text-primary has-text-weight-medium">Postal Address</label>
                        <div className="control">
                            <input className={"input border-linear"}
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
                                            placeholder="+30 694 435 8945" value={profile?.mobileNum}/>
                                </p>
                            </div>
                        </div>
                        <p className="help has-text-grey-light">For delivery/collection notifications.</p>
                    </div>
                </div>
                <div className={"column is-1"}></div>
            </div>
        </section>
    )
};

export default TravelerProfilePage;