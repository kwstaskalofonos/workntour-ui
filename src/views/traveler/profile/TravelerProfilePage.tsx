import React, {useEffect, useState} from "react";
import TravelerProfileImage from "@src/views/traveler/profile/TravelerProfileImage";
import {useAppSelector} from "@src/state/stores/hooks";
import {TravelerProfile} from "@src/state/stores/user/models";
import cloneDeep from "lodash/cloneDeep";
import {extractYearMonthDay, getNationalities} from "@src/utilities/ui";
import CustomDateInput from "@src/views/common/CustomDateInput";

const TravelerProfilePage:React.FunctionComponent = () =>{

    const userProfile = useAppSelector((state)=> state.session.authenticationSlice.profile as unknown as TravelerProfile);
    const [profile,setProfile] = useState<TravelerProfile>();
    const [day,setDay] = useState<string>("");
    const [month,setMonth] = useState<string>("");
    const [year,setYear] = useState<string>("");

    useEffect(()=>{
        if(userProfile){
            const [initialYear,initialMonth,initialDay] = extractYearMonthDay(userProfile.birthday);
            setYear(initialYear);
            setDay(initialDay);
            setMonth(initialMonth);
            let tmp:TravelerProfile = {name:userProfile.name,surname:userProfile.surname
            ,description:userProfile.description,profileImage:userProfile.profileImage,email:userProfile.email,
            memberId:userProfile.memberId,role:userProfile.role,mobileNum:userProfile.mobileNum
                ,nationality:userProfile.nationality,birthday:userProfile.birthday,sex:userProfile.sex}
            setProfile(tmp);
        }
    },[userProfile])

    const renderNationalities = () =>{
        let array:any[]=[];
        array.push(<option key={"nationality-option-empty-1"} value={""} label={"Select Nationality"}/>);
        for(let item of getNationalities()){
            array.push(<option key={"nationality-option-"+item.label}
                               value={item.value} label={item.label}/>)
        }
        return array;
    }

    const onSelectNationality = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.nationality = value;
        setProfile(tmp);
    }

    return(
        <section className={"mt-6"}>
            <div className={"columns is-centered"}>
                <div className={"column is-1"}></div>
                <div className={"column is-4"}>
                    <TravelerProfileImage/>
                    <div className="field mt-6">
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
                                    className={"border-linear has-text-primary"}
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
                <div className={"column is-2"}></div>
                <div className={"column is-4"}></div>
                <div className={"column is-1"}></div>
            </div>
        </section>
    )
};

export default TravelerProfilePage;