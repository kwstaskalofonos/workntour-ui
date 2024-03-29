import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@src/state/stores/hooks";
import {CompanyHostProfile, IndividualHostProfile, Role} from "@src/state/stores/user/models";
import Flag from "react-flagkit";
import ProfileImage from "@src/views/common/ProfileImage";
// @ts-ignore
import profilePhoto from "@src/assets/hostProfile.png";
import countryList from "react-select-country-list";
import {countries as codes} from "@src/utilities/countries";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import {getNationalities} from "@src/utilities/ui";
import cloneDeep from "lodash/cloneDeep";
import {updateIndividualProfile} from "@src/state/stores/user/operations";
import {toast} from "react-toastify";

const IndividualProfilePage:React.FunctionComponent = () =>{

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state)=> state.session.authenticationSlice.profile as unknown as IndividualHostProfile);
    const [countries, setCountries] = useState<any>('');
    const [profile,setProfile] = useState<IndividualHostProfile>();
    const [selected,setSelected] =
        useState<{value:string,label:JSX.Element}>({value:'GR',label:<Flag country="GR" />});
    const [countryCode,setCountryCode] = useState<string>("30");
    const [completion,setCompletion] = useState<number>(0);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [initialized,setInitialized] = useState<boolean>(false);
    const [file,setFile] = useState<File>();
    const [disabled,setDisabled] = useState<boolean>(true);

    useEffect(()=>{
        setInitialized(true);
        if(userProfile){
            setProfile(userProfile);
            let array:any[] = [];
            array.push(<option key={"country-key-"+1} value={""} label={""}/>);
            countryList().getData().forEach(value => {
                array.push(<option value={value.label} key={"country-key-"+value.label}
                                   label={value.label}>{value.label}</option>);
            });
            setCountries(array);
            let idx = codes.findIndex(value => value.code == userProfile.countryCodeMobileNum);
            if(idx>-1){
                setSelected({value:codes[idx].value,label:<Flag country={codes[idx].value} />});
                setCountryCode(userProfile.countryCodeMobileNum);
            }


            let completed = 0;

            if(userProfile.postalAddress){
                completed = completed +16.7;
            }
            if(userProfile.country){
                completed = completed +16.7;
            }
            if(userProfile.mobileNum){
                completed = completed +16.7;
            }
            if(userProfile.fixedNumber){
                completed = completed +16.7;
            }
            if(userProfile.nationality){
                completed = completed +16.7;
            }
            if(userProfile.sex){
                completed = completed +16.7;
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
        if(!profile?.country){
            toast.error("You must select a country");
            return;
        }
        if(!profile?.sex){
            toast.error("You must select a sex type");
            return;
        }
        let formData = new FormData();
        if(file){
            formData.append("profileImage",file);
        }
        formData.append("updatedIndividualHost",new Blob([JSON.stringify(profile)],{type:"application/json"}));
        setIsLoading(true);
        dispatch(updateIndividualProfile(formData,setIsLoading,setFile));
    }

    const onChangePostal = (value:any) =>{
        let tmp = cloneDeep(userProfile)!;
        tmp.postalAddress = value;
        setProfile(tmp);
    }

    const onSelectCountry = (value:any) =>{
        let tmp = cloneDeep(profile)!;
        tmp.country = value;
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

    const renderNationalities = () =>{
        let array:any[]=[];
        array.push(<option key={"nationality-option-empty-1"} value={""} label={"Select Nationality"}/>);
        for(let item of getNationalities()){
            array.push(<option key={"nationality-option-"+item.label}
                               value={item.value} label={item.label}>{item.label}</option>)
        }
        return array;
    }

    useEffect(()=>{
        if(profile&&initialized){
            if(profile.postalAddress!=userProfile.postalAddress||profile.country!=userProfile.country||
            profile.mobileNum!=userProfile.mobileNum||countryCode!=userProfile.countryCodeMobileNum||
            profile.fixedNumber!=userProfile.fixedNumber||profile.nationality!=userProfile.nationality||
            profile.sex!=userProfile.sex||file){

                setDisabled(false);
                return;
            }
            setDisabled(true);
        }
    },[profile,file])

    return(
        <div className={"profile"}>
            <div className={"columns is-centered"}>
                <div className={"column is-1"}></div>
                <div className={"column is-narrow"}>
                    <ProfileImage defaultImage={profilePhoto} role={Role.INDIVIDUAL_HOST}
                     name={userProfile?userProfile.name:''} surname={userProfile?userProfile.surname:''}
                    completion={completion} setFile={setFile} profileImage={profile?.profileImage}/>
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
                                    <select className={"border-linear"} value={profile?.country}
                                    onChange={(e)=>onSelectCountry(e.currentTarget.value)}>
                                        {countries}
                                    </select>
                                </div>
                            </div>
                        </div>
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
                    </div>
                    <div className={"column is-4"}>
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Fixed Number</label>
                            <div className="control">
                                <input className={"input border-linear"}
                                       onChange={(e)=>onChangeFixedNum(e.currentTarget.value)}
                                       type={"text"} value={profile?profile.fixedNumber:''}/>
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
                        <div className="field">
                            <label className="label has-text-primary has-text-weight-medium">Sex*</label>
                            <div className="select is-fullwidth">
                                <select className={"border-linear"}
                                        value={profile?.sex}
                                onChange={(e)=>onSelectSex(e.currentTarget.value)}>
                                    <option key={"sex-key-"+1} value={""}></option>
                                    <option key={"sex-key-FEMALE"} value={"FEMALE"}>Female</option>
                                    <option key={"sex-key-MALE"} value={"MALE"}>Male</option>
                                    <option key={"sex-key-OTHER"} value={"OTHER"}>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <p className="control is-fullwidth">
                                <button className={"button is-primary is-fullwidth "+((isLoading)?"is-loading":'')}
                                   disabled={disabled}
                                        type={"button"} onClick={onSubmit}>
                                    Save
                                </button>
                            </p>
                        </div>
                    </div>
                    <div className={"column is-1"}></div>
                </div>
            </section>
        </div>
    )
};

export default IndividualProfilePage;