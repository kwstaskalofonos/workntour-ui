import React, {useEffect, useMemo, useState} from "react";
import {CompanyHostProfile, Role, TravelerProfile} from "@src/state/stores/user/models";
import ProfileImage from "@src/views/common/ProfileImage";
// @ts-ignore
import profilePhoto from "@src/assets/hostProfile.png";
import {useAppSelector} from "@src/state/stores/hooks";
import countryList from 'react-select-country-list';
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import Flag from "react-flagkit";
import {countries as codes} from "@src/utilities/countries";

const CompanyProfilePage:React.FunctionComponent = () =>{

    const profile = useAppSelector((state)=> state.session.authenticationSlice.profile as unknown as CompanyHostProfile);
    const [countries, setCountries] = useState<any>('');
    const [selectedCountry,setSelectedCountry] = useState({label:'',value:''});
    const [selected,setSelected] =
        useState<{value:string,label:JSX.Element}>({value:'GR',label:<Flag country="GR" />});
    const [countryCode,setCountryCode] = useState<string>("30");
    const [completion,setCompletion] = useState<number>(0);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [file,setFile] = useState<File>();

    useEffect(()=>{
        if(profile){
            setSelectedCountry({label:profile.headquartersCounty,value:profile.headquartersCounty});
            let array:any[] = [];
            countryList().getData().forEach(value => {
                array.push(<option value={value.label} selected={value.label == profile.headquartersCounty}
                                   label={value.label}>{value.label}</option>)
            });
            setCountries(array);
            let idx = codes.findIndex(value => value.code == profile.countryCodeMobileNum);
            if(idx>-1){
                setSelected({value:codes[idx].value,label:<Flag country={codes[idx].value} />});
                setCountryCode(profile.countryCodeMobileNum);
            }

            let completed = 0;
            if(profile.email){
                completed = completed +25;
            }
            if(profile.postalAddress){
                completed = completed +25;
            }
            if(profile.headquartersCounty){
                completed = completed +25;
            }
            if(profile.mobileNum){
                completed = completed +25;
            }
            if(profile.fixedNumber){
                completed = completed +25;
            }
            setCompletion(completed);

        }
    },[profile])

    return(
        <div className={"profile"}>
            <div className={"columns is-centered"}>
                <div className={"column is-1"}></div>
                <div className={"column is-narrow"}>
                    <ProfileImage defaultImage={profilePhoto} role={Role.COMPANY_HOST}
                    name={profile?profile.companyName:''} surname={""} setFile={setFile}/>
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
                                <input className={"input"}
                                       disabled type={"text"} value={profile?profile.email:''}/>
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
                            <label className="label has-text-primary has-text-weight-medium">Country</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select className={"border-linear"}>
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
                                       type={"text"} value={profile?profile.fixedNumber:''}/>
                            </div>
                        </div>
                        <div className="field">
                            <p className="control is-fullwidth">
                                <a className={"button is-primary is-fullwidth "+((isLoading)?"is-loading":'')}
                                   type={"button"}>
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