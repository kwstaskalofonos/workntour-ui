import React, {useEffect, useMemo, useState} from "react";
import {CompanyHostProfile, Role, TravelerProfile} from "@src/state/stores/user/models";
import ProfileImage from "@src/views/common/ProfileImage";
// @ts-ignore
import profilePhoto from "@src/assets/hostProfile.png";
import {useAppDispatch, useAppSelector} from "@src/state/stores/hooks";
import countryList from 'react-select-country-list';
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import Flag from "react-flagkit";
import {countries as codes} from "@src/utilities/countries";
import {updateCompanyProfile, updateTravelerProfile} from "@src/state/stores/user/operations";
import cloneDeep from "lodash/cloneDeep";

const CompanyProfilePage:React.FunctionComponent = () =>{

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state)=> state.session.authenticationSlice.profile as unknown as CompanyHostProfile);
    const [countries, setCountries] = useState<any>('');
    const [profile,setProfile] = useState<CompanyHostProfile>();
    const [selectedCountry,setSelectedCountry] = useState({label:'',value:''});
    const [selected,setSelected] =
        useState<{value:string,label:JSX.Element}>({value:'',label:<Flag country="" />});
    const [countryCode,setCountryCode] = useState<string>("30");
    const [completion,setCompletion] = useState<number>(0);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [initialized,setInitialized] = useState<boolean>(false);
    const [file,setFile] = useState<File>();

    useEffect(()=>{
        setInitialized(true);
        if(userProfile){
            setProfile(userProfile);
            setSelectedCountry({label:userProfile.headquartersCounty,value:userProfile.headquartersCounty});
            let array:any=[];
            countryList().getData().forEach(value => {
                array.push(<option value={value.label} selected={value.label == userProfile.headquartersCounty}
                                   label={value.label}>{value.label}</option>)
            });
            setCountries(array);
            let idx = codes.findIndex(value => value.code == userProfile.countryCodeMobileNum);
            if(idx>-1){
                setSelected({value:codes[idx].value,label:<Flag country={codes[idx].value} />});
                setCountryCode(userProfile.countryCodeMobileNum);
            }

            let completed = 0;
            if(userProfile.postalAddress){
                completed = completed +25;
            }
            if(userProfile.headquartersCounty){
                completed = completed +25;
            }
            if(userProfile.mobileNum){
                completed = completed +25;
            }
            if(userProfile.fixedNumber){
                completed = completed +25;
            }
            setCompletion(completed);

        }
    },[userProfile])

    useEffect(()=>{
        if(countryCode&&initialized){
            let tmp = cloneDeep(profile)!;
            tmp.countryCodeMobileNum = countryCode;
            setProfile(tmp);
        }
    },[countryCode])

    const onSubmit = () =>{

        let formData = new FormData();
        if(file){
            formData.append("profileImage",file);
        }
        formData.append("updatedCompanyHostProfile",new Blob([JSON.stringify(profile)],{type:"application/json"}));
        setIsLoading(true);
        dispatch(updateCompanyProfile(formData,setIsLoading))
    }

    const onChangePostal = (value:any) =>{
        let tmp = cloneDeep(userProfile)!;
        tmp.postalAddress = value;
        setProfile(tmp);
    }

    const onSelectCountry = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.headquartersCounty = value;
        setProfile(tmp);
    }

    const onChangeMobileNum = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.mobileNum = value;
        setProfile(tmp);
    }

    const onChangeFixedNum = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.fixedNumber = value;
        setProfile(tmp);
    }

    return(
        <div className={"profile"}>
            <div className={"columns is-centered"}>
                <div className={"column is-1"}></div>
                <div className={"column is-narrow"}>
                    <ProfileImage defaultImage={profilePhoto} role={Role.COMPANY_HOST} completion={completion}
                    name={userProfile?userProfile.companyName:''} surname={""} setFile={setFile}
                    profileImage={profile?.profileImage}/>
                </div>
                <div className={"column is-7"}/>
            </div>
            <section>
                <div className={"columns is-centered"}>
                    <div className={"column is-1"}></div>
                    <div className={"column is-4"}>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Email</label>
                            <div className="control">
                                <input className={"input border-linear-disabled"}
                                       disabled type={"text"} value={profile?profile.email:''}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Postal Address</label>
                            <div className="control">
                                <input className={"input border-linear"}
                                       onChange={(e)=>onChangePostal(e.currentTarget.value)}
                                       type={"text"} value={profile?profile.postalAddress:''}/>
                            </div>
                        </div>
                        <div className={"field"}>
                            <label className="label has-text-primary has-text-weight-medium">Country</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select className={"border-linear"}
                                    onChange={(e)=>onSelectCountry(e.currentTarget.value)}>
                                        {countries}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"column is-4"}>
                        <div className={"field"}>
                            <label className="label has-text-primary has-text-weight-medium">Phone Number</label>
                            <div className="control">
                                <div className="field has-addons">
                                    <CustomSelectCountry value={selected} setValue={setSelected} setCountryCode={setCountryCode}/>
                                    <p className="control is-expanded">
                                        <input className="input border-linear-no-left" type="text"
                                               onChange={(e)=>onChangeMobileNum(e.currentTarget.value)}
                                               placeholder="+30 694 435 8945" value={profile?.mobileNum}/>
                                    </p>
                                </div>
                            </div>
                            <p className="help has-text-grey-light">For delivery/collection notifications.</p>
                        </div>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Fixed Number</label>
                            <div className="control">
                                <input className={"input border-linear"}
                                       onChange={(e)=>onChangeFixedNum(e.currentTarget.value)}
                                       type={"text"} value={profile?profile.fixedNumber:''}/>
                            </div>
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

export default CompanyProfilePage;