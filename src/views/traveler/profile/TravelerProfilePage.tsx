import React, {useEffect, useRef, useState} from "react";
import ProfileImage from "@src/views/common/ProfileImage";
import {useAppDispatch, useAppSelector} from "@src/state/stores/hooks";
import {
    Role,
    SpecialDietary,
    TravelerProfileDTO,
    TypeOfTraveler,
    TypeOfTravelerType
} from "@src/state/stores/user/models";
import cloneDeep from "lodash/cloneDeep";
import {extractYearMonthDay, getNationalities} from "@src/utilities/ui";
import CustomDateInput from "@src/views/common/CustomDateInput";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
// @ts-ignore
import profilePhoto from "@src/assets/travelerProfile.png";
import Flag from "react-flagkit";
import {countries} from "@src/utilities/countries";
import {updateTravelerProfile} from "@src/state/stores/user/operations";
import InterestsModal, {InterestsModalHandler} from "@src/views/traveler/profile/InterestsModal";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons/faTrashCan";
import LanguagesModal from "@src/views/traveler/profile/LanguagesModal";
import SkillsModal, {SkillsModalHandler} from "@src/views/traveler/profile/SkillsModal";
import ExperienceModal from "@src/views/traveler/profile/ExperienceModal";
import {toast} from "react-toastify";

const TravelerProfilePage: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();
    const interestsModalHandler = useRef<InterestsModalHandler>();
    const skillsModalHandler = useRef<SkillsModalHandler>();
    const [activeLanguageModal,setActiveLanguageModal] = useState<boolean>(false);
    const [activeExperienceModal,setActiveExperienceModal] = useState<boolean>(false);
    const userProfile = useAppSelector((state) => state.session.authenticationSlice.profile as unknown as TravelerProfileDTO);
    const [profile, setProfile] = useState<TravelerProfileDTO>();
    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [selected, setSelected] =
        useState<{ value: string, label: JSX.Element }>({value: 'GR', label: <Flag country="GR"/>});
    const [countryCode, setCountryCode] = useState<string>("30");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [completion, setCompletion] = useState<number>(0);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        setInitialized(true);
        if (userProfile) {

            if (userProfile.countryCodeMobileNum) {
                let idx = countries.findIndex(value => value.code == userProfile.countryCodeMobileNum);
                if (idx > -1) {
                    setSelected({value: countries[idx].value, label: <Flag country={countries[idx].value}/>});
                    setCountryCode(userProfile.countryCodeMobileNum);
                }
            }

            const [initialYear, initialMonth, initialDay] = extractYearMonthDay(userProfile.birthday);
            setYear(initialYear);
            setDay(initialDay);
            setMonth(initialMonth);
            let tmp: TravelerProfileDTO = {
                memberId: userProfile.memberId,
                name: userProfile.name,
                surname: userProfile.surname,
                role: userProfile.role,
                description: userProfile.description,
                email: userProfile.email,
                birthday: userProfile.birthday,
                countryCodeMobileNum: userProfile.countryCodeMobileNum,
                mobileNum: userProfile.mobileNum,
                nationality: userProfile.nationality,
                address: userProfile.address,
                city: userProfile.city,
                country: userProfile.country,
                sex: userProfile.sex,
                postalAddress: userProfile.postalAddress,
                typeOfTraveler: userProfile.typeOfTraveler,
                profileImage: userProfile.profileImage,
                interests: userProfile.interests,
                languages: userProfile.languages,
                skills: userProfile.skills,
                experience: userProfile.experience,
                specialDietary: userProfile.specialDietary,
                driverLicense: userProfile.driverLicense
            }
            setProfile(tmp);

            let completed = 0;

            if (userProfile.nationality) {
                completed = completed + 14.29;
            }
            if (userProfile.birthday) {
                completed = completed + 14.29;
            }
            if (userProfile.sex) {
                completed = completed + 14.29;
            }
            if (userProfile.email) {
                completed = completed + 14.29;
            }
            if (userProfile.typeOfTraveler) {
                completed = completed + 14.29;
            }
            if (userProfile.postalAddress) {
                completed = completed + 14.29;
            }
            if (userProfile.mobileNum) {
                completed = completed + 14.29;
            }
            setCompletion(completed);

        }
    }, [userProfile])

    const renderNationalities = () => {
        let array: any[] = [];
        array.push(<option key={"nationality-option-empty-1"} value={""} label={"Select Nationality"}/>);
        for (let item of getNationalities()) {
            array.push(<option key={"nationality-option-" + item.label}
                               value={item.value} label={item.label}>{item.label}</option>)
        }
        return array;
    }

    const renderTypeOfTraveler = () => {
        let array: any[] = [];
        array.push(<option key={"category-option-empty"} value={""} label={"Select Type of Traveler"}/>)
        for (const item in TypeOfTraveler) {
            array.push(<option key={"type-of-traveler-option-" + item}
                               value={item}
                               label={TypeOfTraveler[item as TypeOfTravelerType]}>{TypeOfTraveler[item as TypeOfTravelerType]}
            </option>)
        }
        return array;
    }


    useEffect(() => {
        if (countryCode && initialized) {
            let tmp = cloneDeep(profile)!;
            tmp.countryCodeMobileNum = countryCode;
            setProfile(tmp);
        }
    }, [countryCode])

    const onSelectNationality = (value: any) => {
        let tmp = cloneDeep(profile)!;
        tmp.nationality = value;
        setProfile(tmp);
    }

    const onSelectSex = (value: any) => {
        let tmp = cloneDeep(profile)!;
        tmp.sex = value;
        setProfile(tmp);
    }

    const onChangeEmail = (value: any) => {
        let tmp = cloneDeep(profile)!;
        tmp.email = value;
        setProfile(tmp);
    }

    const onSelectType = (value: any) => {
        let tmp = cloneDeep(profile)!;
        tmp.typeOfTraveler = value;
        setProfile(tmp);
    }

    const onChangePostal = (value: any) => {
        let tmp = cloneDeep(profile)!;
        tmp.postalAddress = value;
        setProfile(tmp);
    }

    const onChangeMobileNum = (value: any) => {
        let tmp = cloneDeep(profile)!;
        tmp.mobileNum = value;
        setProfile(tmp);
    }

    useEffect(() => {
        if (profile && initialized) {
            if (profile.nationality != userProfile.nationality || profile.sex != userProfile.sex ||
                profile.typeOfTraveler != userProfile.typeOfTraveler || profile.postalAddress != userProfile.postalAddress ||
                countryCode != userProfile.countryCodeMobileNum || profile.mobileNum != userProfile.mobileNum || file) {
                setDisabled(false);
                return;
            }
            setDisabled(true);
        }
    }, [profile, file])

    const onSubmit = () => {
        if(!profile?.sex){
            toast.error("You must select a sex type");
            return;
        }

        console.log(profile);
        // let formData = new FormData();
        // if (file) {
        //     formData.append("profileImage", file);
        // }
        // formData.append("updatedTravelerProfile",new Blob([JSON.stringify(profile)],{type:"application/json"}));
        // setIsLoading(true);
        // dispatch(updateTravelerProfile(formData, setIsLoading, setFile));
    }

    return (
        <React.Fragment>
            <div className={"container is-fluid profile"}>
                <div className={"columns is-centered"}>
                    <div className={"column is-1"}></div>
                    <div className={"column is-narrow"}>
                        <ProfileImage defaultImage={profilePhoto} role={Role.TRAVELER} setFile={setFile}
                                      name={userProfile ? userProfile.name : ''}
                                      surname={userProfile ? userProfile.surname : ''}
                                      completion={completion} profileImage={profile?.profileImage?.imageUrl}/>
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
                                           disabled type={"text"} value={profile ? profile.name : ''}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Surname</label>
                                <div className="control">
                                    <input className={"input border-linear-disabled"}
                                           disabled type={"text"} value={profile ? profile.surname : ''}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Type of
                                    Traveler</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            className={"border-linear " + (profile?.typeOfTraveler ? "" : "empty-select")}
                                            value={profile?.typeOfTraveler}
                                            onChange={(event) => onSelectType(event.currentTarget.value)}>
                                            {renderTypeOfTraveler()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={"field"}>
                                <label className="label has-text-primary has-text-weight-medium">Nationality</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select value={profile && profile.nationality}
                                                onChange={(e) => onSelectNationality(e.currentTarget.value)}
                                                className={"border-linear " + (profile?.nationality ? "" : "empty-select")}
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
                                    <select className={"border-linear " + ((profile?.sex) ? "" : "empty-select")}
                                            value={profile?.sex}
                                            onChange={(event) => onSelectSex(event.currentTarget.value)}>
                                        <option value={""}>Select sex</option>
                                        <option value={"FEMALE"}>Female</option>
                                        <option value={"MALE"}>Male</option>
                                        <option value={"OTHER"}>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">Email</label>
                                <div className="control">
                                    <input className={"input border-linear-disabled"} disabled={true}
                                           onChange={(event) => onChangeEmail(event.currentTarget.value)}
                                           type={"text"} value={profile ? profile.email : ''}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label has-text-primary has-text-weight-medium">City</label>
                                <div className="control">
                                    <input className={"input border-linear"}
                                           onChange={(event) => onChangePostal(event.currentTarget.value)}
                                           type={"text"} value={profile ? profile.city : ''}/>
                                </div>
                            </div>
                            <div className={"field is-horizontal"}>
                                <div className={"field-body"}>
                                    <div className="field">
                                        <label className="label has-text-primary has-text-weight-medium">Address</label>
                                        <div className="control">
                                            <input className={"input border-linear"}
                                                   onChange={(event) => onChangePostal(event.currentTarget.value)}
                                                   type={"text"} value={profile ? profile.address : ''}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label has-text-primary has-text-weight-medium">Postal
                                            Code</label>
                                        <div className="control">
                                            <input className={"input border-linear"}
                                                   onChange={(event) => onChangePostal(event.currentTarget.value)}
                                                   type={"text"} value={profile ? profile.postalAddress : ''}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"field"}>
                                <label className="label has-text-primary has-text-weight-medium">Phone Number</label>
                                <div className="control">
                                    <div className="field has-addons">
                                        <CustomSelectCountry value={selected} setValue={setSelected}
                                                             setCountryCode={setCountryCode}/>
                                        <p className="control is-expanded">
                                            <input className="input border-linear-no-left" type="text"
                                                   onChange={(event) => onChangeMobileNum(event.currentTarget.value)}
                                                   placeholder="+30 694 435 8945" value={profile?.mobileNum}/>
                                        </p>
                                    </div>
                                </div>
                                <p className="help has-text-grey-light">For delivery/collection notifications.</p>
                            </div>
                            <div className={"field"}>
                                <label className="label has-text-primary has-text-weight-medium">Description</label>
                                <div className={"control"}>
                                    <textarea className={"textarea border-linear"}
                                              value={profile?.description}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={"column is-4"}>
                            {/*Interests*/}
                            <div className={"field"}>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <label className="label has-text-primary has-text-weight-medium">Interests</label>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faPlus}
                                                     onClick={() => interestsModalHandler.current?.open()}/>
                                </div>
                                <div className="field is-grouped is-grouped-multiline border-linear mt-1 mb-3"
                                     style={{borderRadius: "8px", minHeight: '50px'}}>
                                </div>
                            </div>
                            {/*Languages*/}
                            <div className={"field is-flex is-justify-content-space-between"}>
                                    <label className="label has-text-primary has-text-weight-medium">Languages</label>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faPlus}
                                                     onClick={() => setActiveLanguageModal(true)}/>
                            </div>
                            <div className={"box"}>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <div>
                                        <p className={"has-text-primary"}>Greek,&nbsp;
                                            <span className={"has-text-dark"}>Beginner
                                             </span></p>
                                    </div>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faTrashCan}/>
                                </div>
                                <hr/>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <div>
                                        <p className={"has-text-primary"}>French,&nbsp;
                                            <span className={"has-text-dark"}>Intermediate
                                            </span></p>
                                    </div>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faTrashCan}/>
                                </div>
                            </div>
                            {/*Skills*/}
                            <div className={"field"}>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <label className="label has-text-primary has-text-weight-medium">Skills</label>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faPlus}
                                                     onClick={() => skillsModalHandler.current?.open()}/>
                                </div>
                                <div className="field is-grouped is-grouped-multiline border-linear mt-1 mb-3"
                                     style={{borderRadius: "8px", minHeight: '50px'}}>
                                </div>
                            </div>
                            {/*Experience*/}
                            <div className={"field is-flex is-justify-content-space-between"}>
                                <label className="label has-text-primary has-text-weight-medium">Experience</label>
                                <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faPlus}
                                                 onClick={() => setActiveExperienceModal(true)}/>
                            </div>
                            <div className={"box"}>
                                <p style={{color:"rgba(36, 221, 193, 1)"}}>Professional</p>
                                <hr className={"mt-0 mb-2"}/>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <div>
                                        <p className={"has-text-primary"}>Microsoft,&nbsp;
                                            <span className={"has-text-dark"}>Product Designer
                                             </span></p>
                                        <p className={"is-size-7 has-text-grey-light"}>Sep 2014-Aug 2019</p>
                                    </div>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faTrashCan}/>
                                </div>
                                <hr/>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <div>
                                        <p className={"has-text-primary"}>Galaxy Tours,&nbsp;
                                            <span className={"has-text-dark"}>Travel Manager
                                            </span></p>
                                        <p className={"is-size-7 has-text-grey-light"}>Sep 2014-Aug 2019</p>
                                    </div>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faTrashCan}/>
                                </div>
                                <hr/>
                                <p style={{color:"rgba(36, 221, 193, 1)"}}>Education</p>
                                <hr className={"mt-0 mb-2"}/>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <div>
                                        <p className={"has-text-primary"}>Harvard,&nbsp;
                                            <span className={"has-text-dark"}>Tourism
                                             </span></p>
                                        <p className={"is-size-7 has-text-grey-light"}>Sep 2014-Aug 2019</p>
                                    </div>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faTrashCan}/>
                                </div>
                                <hr/>
                                <div className={"is-flex is-justify-content-space-between"}>
                                    <div>
                                        <p className={"has-text-primary"}>Athens College University,&nbsp;
                                            <span className={"has-text-dark"}>Business
                                            </span></p>
                                        <p className={"is-size-7 has-text-grey-light"}>Sep 2014-Aug 2019</p>
                                    </div>
                                    <FontAwesomeIcon className={"is-right has-text-primary mt-2"} icon={faTrashCan}/>
                                </div>
                            </div>
                            {/*Dietary*/}
                            <div className={"field"}>
                                <label className="label has-text-primary has-text-weight-medium">Special Dietary Requirements*</label>
                                <div className={"is-flex"}>
                                    <div className="field">
                                        <input className="is-checkradio is-circle has-background-info is-info" id="dietary1" type="checkbox"
                                               name="dietary1" checked={true}/>
                                        <label htmlFor="dietary1">None</label>
                                    </div>
                                    <div className="field">
                                        <input className="is-checkradio is-circle has-background-info is-info" id="dietary2" type="checkbox"
                                               name="dietary2" />
                                        <label htmlFor="dietary2">Vegan</label>
                                    </div>
                                    <div className="field">
                                        <input className="is-checkradio is-circle has-background-info is-info" id="dietary3" type="checkbox"
                                               name="dietary3" />
                                        <label htmlFor="dietary3">Vegeterian</label>
                                    </div>
                                </div>
                            </div>
                            {/*DriverLicense*/}
                            <div className={"field"}>
                                <label className="label has-text-primary has-text-weight-medium">Driver's License*</label>
                                <div className={"is-flex"}>
                                    <div className="field">
                                        <input className="is-checkradio is-circle has-background-info is-info" id="driver1" type="checkbox"
                                               name="driver1" checked={true}/>
                                        <label htmlFor="driver1">Yes</label>
                                    </div>
                                    <div className="field">
                                        <input className="is-checkradio is-circle has-background-info is-info" id="driver2" type="checkbox"
                                               name="driver2" />
                                        <label htmlFor="driver2">No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <p className="control is-fullwidth">
                                    <button
                                        className={"button is-primary is-fullwidth " + ((isLoading) ? "is-loading" : '')}
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
            {profile &&
                <InterestsModal ref={interestsModalHandler}
                                travelerProfile={profile} setTravelerProfile={setProfile}/>
            }
            {(profile && activeLanguageModal) &&
                <LanguagesModal setActive={setActiveLanguageModal}/>
            }
            {profile &&
                <SkillsModal ref={skillsModalHandler}/>
            }
            {(profile&&activeExperienceModal) &&
                <ExperienceModal setActive={setActiveExperienceModal}/>
            }
        </React.Fragment>
    )
};

export default TravelerProfilePage;