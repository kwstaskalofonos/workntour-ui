import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "@src/views/common/ProfileImage";
import { useAppDispatch, useAppSelector } from "@src/state/stores/hooks";
import {
  Role,
  SpecialDietary,
  TravelerProfileDTO,
  TypeOfTraveler,
  TypeOfTravelerType,
} from "@src/state/stores/user/models";
import cloneDeep from "lodash/cloneDeep";
import { extractYearMonthDay, getNationalities } from "@src/utilities/ui";
import CustomDateInput from "@src/views/common/CustomDateInput";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
// @ts-ignore
import profilePhoto from "@src/assets/travelerProfile.png";
import Flag from "react-flagkit";
import { countries } from "@src/utilities/countries";
import { updateTravelerProfile } from "@src/state/stores/user/operations";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import LanguagesModal from "@src/views/traveler/profile/LanguagesModal";
// import SkillsModal, {
//   SkillsModalHandler,
// } from "@src/views/traveler/profile/SkillsModal";
import ExperienceModal from "@src/views/traveler/profile/ExperienceModal";
import { toast } from "react-toastify";

import MultipleChoicesModal from "./MultipleChoicesModal";

const TravelerProfilePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  // const skillsModalHandler = useRef<SkillsModalHandler>();
  const [activeLanguageModal, setActiveLanguageModal] =
    useState<boolean>(false);
  const [activeExperienceModal, setActiveExperienceModal] =
    useState<boolean>(false);
  const userProfile = useAppSelector(
    (state) =>
      state.session.authenticationSlice.profile as unknown as TravelerProfileDTO
  );
  const [profile, setProfile] = useState<TravelerProfileDTO>();
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [selected, setSelected] = useState<{
    value: string;
    label: JSX.Element;
  }>({ value: "GR", label: <Flag country="GR" /> });
  const [countryCode, setCountryCode] = useState<string>("30");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completion, setCompletion] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [activeInterestsModal, setActiveInterestsModal] =
    useState<boolean>(false);
  const [activeSkillsModal, setActiveSkillsModal] = useState<boolean>(false);

  useEffect(() => {
    setInitialized(true);
    if (userProfile) {
      if (userProfile.countryCodeMobileNum) {
        let idx = countries.findIndex(
          (value) => value.code == userProfile.countryCodeMobileNum
        );
        if (idx > -1) {
          setSelected({
            value: countries[idx].value,
            label: <Flag country={countries[idx].value} />,
          });
          setCountryCode(userProfile.countryCodeMobileNum);
        }
      }

      const [initialYear, initialMonth, initialDay] = extractYearMonthDay(
        userProfile.birthday
      );
      setYear(initialYear);
      setDay(initialDay);
      setMonth(initialMonth);
      console.log(userProfile);
      setProfile({ ...userProfile });

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
  }, [userProfile]);

  const renderNationalities = () => {
    let array: any[] = [];
    array.push(
      <option
        key={"nationality-option-empty-1"}
        value={""}
        label={"Select Nationality"}
      />
    );
    for (let item of getNationalities()) {
      array.push(
        <option
          key={"nationality-option-" + item.label}
          value={item.value}
          label={item.label}
        >
          {item.label}
        </option>
      );
    }
    return array;
  };

  const renderTypeOfTraveler = () => {
    let array: any[] = [];
    array.push(
      <option
        key={"category-option-empty"}
        value={""}
        label={"Select Type of Traveler"}
      />
    );
    for (const item in TypeOfTraveler) {
      array.push(
        <option
          key={"type-of-traveler-option-" + item}
          value={item}
          label={TypeOfTraveler[item as TypeOfTravelerType]}
        >
          {TypeOfTraveler[item as TypeOfTravelerType]}
        </option>
      );
    }
    return array;
  };

  useEffect(() => {
    if (countryCode && initialized) {
      let tmp = cloneDeep(profile)!;
      tmp.countryCodeMobileNum = countryCode;
      setProfile(tmp);
    }
  }, [countryCode]);

  const handleChangeDietary = (e: any) => {
    console.log(e.target.value);
    setProfile({
      ...(profile as TravelerProfileDTO),
      specialDietary: e.target.value,
    });
  };

  useEffect(() => {
    if (profile && initialized) {
      if (
        profile.nationality != userProfile.nationality ||
        profile.sex != userProfile.sex ||
        profile.typeOfTraveler != userProfile.typeOfTraveler ||
        profile.postalAddress != userProfile.postalAddress ||
        countryCode != userProfile.countryCodeMobileNum ||
        profile.mobileNum != userProfile.mobileNum ||
        profileImageFile
      ) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
    }
  }, [profile, profileImageFile]);

  const onSubmit = () => {

    let formData = new FormData();
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }
    formData.append(
      "updatedTravelerProfile",
      new Blob([JSON.stringify(profile)], { type: "application/json" })
    );
    console.log(profile);
    setIsLoading(true);
    dispatch(
      updateTravelerProfile(formData, setIsLoading, setProfileImageFile)
    );
  };

  const placeholderGenerator = (choicesArr: string[] | undefined) => {
    if (!choicesArr) return "";
    console.log(choicesArr);
    let finalPlaceholder: string = choicesArr[0]
      ?.toLowerCase()
      .replace("_", " ");
    choicesArr.slice(1).map((choice: string) => {
      finalPlaceholder += `, ${choice.toLowerCase().replace("_", " ")}`;
    });
    return finalPlaceholder;
  };

  return (
    <React.Fragment>
      <div className={"profile"}>
        <form className="profileForm">
          <div className={"is-flex"}>
            <ProfileImage
              defaultImage={profilePhoto}
              role={Role.TRAVELER}
              setFile={setProfileImageFile}
              name={userProfile ? userProfile.name : ""}
              surname={userProfile ? userProfile.surname : ""}
              completion={completion}
              profileImage={profile?.profileImage?.imageUrl}
            />
          </div>
          <section>
            <div className={"columns is-centered"}>
              <div className={"column is-6"}>
                <div className="field">
                  <label className="label has-text-primary has-text-weight-medium">
                    Name
                  </label>
                  <div className="control">
                    <input
                      className={"input border-linear-disabled"}
                      disabled
                      type={"text"}
                      value={profile?.name || ""}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-primary has-text-weight-medium">
                    Surname
                  </label>
                  <div className="control">
                    <input
                      className={"input border-linear-disabled"}
                      disabled
                      type={"text"}
                      value={profile?.surname || ""}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-primary has-text-weight-medium">
                    Type of Traveler
                  </label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        className={
                          "border-linear " +
                          (profile?.typeOfTraveler ? "" : "empty-select")
                        }
                        value={profile?.typeOfTraveler || ""}
                        onChange={(e) =>
                          setProfile({
                            ...(profile as TravelerProfileDTO),
                            typeOfTraveler: e.target.value,
                          })
                        }
                      >
                        {renderTypeOfTraveler()}
                      </select>
                    </div>
                  </div>
                </div>
                <div className={"field"}>
                  <label className="label has-text-primary has-text-weight-medium">
                    Nationality
                  </label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={profile?.nationality || ""}
                        className={
                          "border-linear " +
                          (profile?.nationality ? "" : "empty-select")
                        }
                        placeholder={"Select your Nationality"}
                        onChange={(e) =>
                          setProfile({
                            ...(profile as TravelerProfileDTO),
                            nationality: e.target.value,
                          })
                        }
                      >
                        {renderNationalities()}
                      </select>
                    </div>
                  </div>
                </div>
                <CustomDateInput
                  day={day}
                  month={month}
                  year={year}
                  disabled={true}
                  setDay={setDay}
                  setMonth={setMonth}
                  setYear={setYear}
                />
                <div className="field">
                  <label className="label has-text-primary has-text-weight-medium">
                    Sex*
                  </label>
                  <div className="select is-fullwidth">
                    <select
                      className={
                        "border-linear " + (profile?.sex ? "" : "empty-select")
                      }
                      value={profile?.sex || ""}
                      onChange={(e) =>
                        setProfile({
                          ...(profile as TravelerProfileDTO),
                          sex: e.target.value,
                        })
                      }
                    >
                      <option value={""}>Select sex</option>
                      <option value={"FEMALE"}>Female</option>
                      <option value={"MALE"}>Male</option>
                      <option value={"OTHER"}>Other</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-primary has-text-weight-medium">
                    Email
                  </label>
                  <div className="control">
                    <input
                      className={"input border-linear-disabled"}
                      disabled={true}
                      onChange={(e) =>
                        setProfile({
                          ...(profile as TravelerProfileDTO),
                          email: e.target.value,
                        })
                      }
                      type={"text"}
                      value={profile?.email || ""}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-primary has-text-weight-medium">
                    City
                  </label>
                  <div className="control">
                    <input
                      className={"input border-linear"}
                      type={"text"}
                      value={profile?.city || ""}
                      onChange={(e) =>
                        setProfile({
                          ...(profile as TravelerProfileDTO),
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className={"field is-horizontal"}>
                  <div className={"field-body"}>
                    <div className="field">
                      <label className="label has-text-primary has-text-weight-medium">
                        Address
                      </label>
                      <div className="control">
                        <input
                          className={"input border-linear"}
                          type={"text"}
                          value={profile?.address || ""}
                          onChange={(e) =>
                            setProfile({
                              ...(profile as TravelerProfileDTO),
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label has-text-primary has-text-weight-medium">
                        Postal Code
                      </label>
                      <div className="control">
                        <input
                          className={"input border-linear"}
                          type={"text"}
                          value={profile?.postalAddress || ""}
                          onChange={(e) =>
                            setProfile({
                              ...(profile as TravelerProfileDTO),
                              postalAddress: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"field"}>
                  <label className="label has-text-primary has-text-weight-medium">
                    Phone Number
                  </label>
                  <div className="control">
                    <div className="field has-addons">
                      <CustomSelectCountry
                        value={selected}
                        setValue={setSelected}
                        setCountryCode={setCountryCode}
                      />
                      <p className="control is-expanded">
                        <input
                          className="input border-linear-no-left"
                          type="text"
                          placeholder="+30 694 435 8945"
                          value={profile?.mobileNum || ""}
                          onChange={(e) =>
                            setProfile({
                              ...(profile as TravelerProfileDTO),
                              mobileNum: e.target.value,
                            })
                          }
                        />
                      </p>
                    </div>
                  </div>
                  <p className="help has-text-grey-light">
                    For delivery/collection notifications.
                  </p>
                </div>
                <div className={"field"}>
                  <label className="label has-text-primary has-text-weight-medium">
                    Description
                  </label>
                  <div className={"control"}>
                    <textarea
                      className={"textarea border-linear"}
                      value={profile?.description || ""}
                      onChange={(e) =>
                        setProfile({
                          ...(profile as TravelerProfileDTO),
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={"column is-6"}>
                {/*Interests*/}
                <div className={"field"}>
                  <div className={"is-flex is-justify-content-space-between"}>
                    <label className="label has-text-primary has-text-weight-medium">
                      Interests
                    </label>
                    <FontAwesomeIcon
                      className={"is-clickable is-right has-text-primary mt-2"}
                      icon={faPlus}
                      onClick={() => setActiveInterestsModal(true)}
                    />
                  </div>
                  <input
                    className="input border-linear"
                    defaultValue={placeholderGenerator(profile?.interests)}
                    onClick={() => setActiveInterestsModal(true)}
                  />
                </div>
                {/*Languages*/}
                <div
                  className={"field is-flex is-justify-content-space-between"}
                >
                  <label className="label has-text-primary has-text-weight-medium">
                    Languages
                  </label>
                  <FontAwesomeIcon
                    className={"is-clickable is-right has-text-primary mt-2"}
                    icon={faPlus}
                    onClick={() => setActiveLanguageModal(true)}
                  />
                </div>
                <div className={"box"}>
                  <div className={"is-flex is-justify-content-space-between"}>
                    <div>
                      <p className={"has-text-primary"}>
                        Greek,&nbsp;
                        <span className={"has-text-dark"}>Beginner</span>
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={"is-clickable is-right has-text-primary mt-2"}
                      icon={faTrashCan}
                    />
                  </div>
                  <hr />
                  <div className={"is-flex is-justify-content-space-between"}>
                    <div>
                      <p className={"has-text-primary"}>
                        French,&nbsp;
                        <span className={"has-text-dark"}>Intermediate</span>
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={"is-right has-text-primary mt-2"}
                      icon={faTrashCan}
                    />
                  </div>
                </div>
                {/*Skills*/}
                <div className={"field"}>
                  <div className={"is-flex is-justify-content-space-between"}>
                    <label className="label has-text-primary has-text-weight-medium">
                      Skills
                    </label>
                    <FontAwesomeIcon
                      className={"is-right has-text-primary mt-2"}
                      icon={faPlus}
                      onClick={() => setActiveSkillsModal(true)}
                    />
                  </div>
                  <input
                    className="input border-linear"
                    defaultValue={placeholderGenerator(profile?.skills)}
                    onClick={() => setActiveSkillsModal(true)}
                  />
                </div>
                {/*Experience*/}
                <div
                  className={"field is-flex is-justify-content-space-between"}
                >
                  <label className="label has-text-primary has-text-weight-medium">
                    Experience
                  </label>
                  <FontAwesomeIcon
                    className={"is-right has-text-primary mt-2"}
                    icon={faPlus}
                    onClick={() => setActiveExperienceModal(true)}
                  />
                </div>
                <div className={"box"}>
                  <p style={{ color: "rgba(36, 221, 193, 1)" }}>Professional</p>
                  <hr className={"mt-0 mb-2"} />
                  <div className={"is-flex is-justify-content-space-between"}>
                    <div>
                      <p className={"has-text-primary"}>
                        Microsoft,&nbsp;
                        <span className={"has-text-dark"}>
                          Product Designer
                        </span>
                      </p>
                      <p className={"is-size-7 has-text-grey-light"}>
                        Sep 2014-Aug 2019
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={"is-right has-text-primary mt-2"}
                      icon={faTrashCan}
                    />
                  </div>
                  <hr />
                  <div className={"is-flex is-justify-content-space-between"}>
                    <div>
                      <p className={"has-text-primary"}>
                        Galaxy Tours,&nbsp;
                        <span className={"has-text-dark"}>Travel Manager</span>
                      </p>
                      <p className={"is-size-7 has-text-grey-light"}>
                        Sep 2014-Aug 2019
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={"is-right has-text-primary mt-2"}
                      icon={faTrashCan}
                    />
                  </div>
                  <hr />
                  <p style={{ color: "rgba(36, 221, 193, 1)" }}>Education</p>
                  <hr className={"mt-0 mb-2"} />
                  <div className={"is-flex is-justify-content-space-between"}>
                    <div>
                      <p className={"has-text-primary"}>
                        Harvard,&nbsp;
                        <span className={"has-text-dark"}>Tourism</span>
                      </p>
                      <p className={"is-size-7 has-text-grey-light"}>
                        Sep 2014-Aug 2019
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={"is-right has-text-primary mt-2"}
                      icon={faTrashCan}
                    />
                  </div>
                  <hr />
                  <div className={"is-flex is-justify-content-space-between"}>
                    <div>
                      <p className={"has-text-primary"}>
                        Athens College University,&nbsp;
                        <span className={"has-text-dark"}>Business</span>
                      </p>
                      <p className={"is-size-7 has-text-grey-light"}>
                        Sep 2014-Aug 2019
                      </p>
                    </div>
                    <FontAwesomeIcon
                      className={"is-right has-text-primary mt-2"}
                      icon={faTrashCan}
                    />
                  </div>
                </div>
                {/*Dietary*/}
                <div className={"field"}>
                  <label className="label has-text-primary has-text-weight-medium">
                    Special Dietary Requirements*
                  </label>

                  <div className={"is-flex"}>
                    <div className="field checkBoxWithLabel">
                      <input
                        id="dietary1"
                        className="profileCheckbox"
                        type="radio"
                        value={SpecialDietary.NONE}
                        name="dietary"
                        onChange={handleChangeDietary}
                        checked={
                          profile?.specialDietary === SpecialDietary.NONE
                        }
                      />
                      <label htmlFor="dietary1">None</label>
                    </div>
                    <div className="field checkBoxWithLabel">
                      <input
                        id="dietary2"
                        className="profileCheckbox"
                        type="radio"
                        value={SpecialDietary.VEGAN}
                        name="dietary"
                        onChange={handleChangeDietary}
                        checked={
                          profile?.specialDietary === SpecialDietary.VEGAN
                        }
                      />
                      <label htmlFor="dietary2">Vegan</label>
                    </div>
                    <div className="field checkBoxWithLabel">
                      <input
                        id="dietary3"
                        className="profileCheckbox"
                        type="radio"
                        value={SpecialDietary.VEGETARIAN}
                        name="dietary"
                        onChange={handleChangeDietary}
                        checked={
                          profile?.specialDietary === SpecialDietary.VEGETARIAN
                        }
                      />
                      <label htmlFor="dietary3">Vegetarian</label>
                    </div>
                  </div>
                </div>
                {/*DriverLicense*/}
                <div className={"field"}>
                  <label className="label has-text-primary has-text-weight-medium">
                    Driver's License*
                  </label>
                  <div className={"is-flex"}>
                    <div className="field checkBoxWithLabel">
                      <input
                        className="profileCheckbox"
                        id="driver1"
                        type="radio"
                        name="driver"
                        onChange={(e) =>
                          setProfile({
                            ...(profile as TravelerProfileDTO),
                            driverLicense: true,
                          })
                        }
                        checked={profile?.driverLicense === true}
                      />
                      <label htmlFor="driver1">Yes</label>
                    </div>
                    <div className="field checkBoxWithLabel">
                      <input
                        className="profileCheckbox"
                        id="driver2"
                        type="radio"
                        name="driver"
                        onChange={(e) =>
                          setProfile({
                            ...(profile as TravelerProfileDTO),
                            driverLicense: false,
                          })
                        }
                        checked={profile?.driverLicense === false}
                      />
                      <label htmlFor="driver2">No</label>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <p className="control is-fullwidth">
                    <button
                      className={
                        "button is-primary is-fullwidth " +
                        (isLoading ? "is-loading" : "")
                      }
                      disabled={disabled}
                      type={"button"}
                      onClick={onSubmit}
                    >
                      Save
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
      {/* {profile && (
        <InterestsModal
          ref={interestsModalHandler}
          travelerProfile={profile}
          setTravelerProfile={setProfile}
        />
      )} */}
      {profile && activeLanguageModal && (
        <LanguagesModal setActive={setActiveLanguageModal} />
      )}
      {profile && activeInterestsModal && (
        <MultipleChoicesModal
          setActive={setActiveInterestsModal}
          travelerProfile={profile}
          setTravelerProfile={setProfile}
          kindOfContent="interests"
        />
      )}
      {profile && activeSkillsModal && (
        <MultipleChoicesModal
          setActive={setActiveSkillsModal}
          travelerProfile={profile}
          setTravelerProfile={setProfile}
          kindOfContent="skills"
        />
      )}
      {profile && activeExperienceModal && (
        <ExperienceModal setActive={setActiveExperienceModal} />
      )}
    </React.Fragment>
  );
};

export default TravelerProfilePage;
