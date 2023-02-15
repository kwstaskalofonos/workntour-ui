import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/state/stores/hooks";
import { IndividualHostProfileDto, Role } from "@src/state/stores/user/models";
import Flag from "react-flagkit";
import ProfileImage from "@src/views/common/ProfileImage";
// @ts-ignore
import profilePhoto from "@src/assets/hostProfile.png";
import countryList from "react-select-country-list";
import { countries as codes } from "@src/utilities/countries";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import { renderNationalities } from "@src/utilities/ui";
import cloneDeep from "lodash/cloneDeep";
import { updateIndividualProfile } from "@src/state/stores/user/operations";
import { toast } from "react-toastify";

const IndividualProfilePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(
    (state) =>
      state.session.authenticationSlice
        .profile as unknown as IndividualHostProfileDto
  );
  const [profile, setProfile] = useState<IndividualHostProfileDto>();
  const [selected, setSelected] = useState<{
    value: string;
    label: JSX.Element;
  }>({ value: "GR", label: <Flag country="GR" /> });
  const [countryCode, setCountryCode] = useState<string>("30");
  const [completion, setCompletion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [clearImage, setClearImage] = useState<boolean>(false);


  useEffect(() => {
    const totalFields = 12;
    let completed = 0;
    function hasValue(property: any) {
      return property ? 1 : 0;
    }
    completed += hasValue(profileImageFile || profile?.profileImage);
    completed += hasValue(profile?.name);
    completed += hasValue(profile?.surname);
    completed += hasValue(profile?.email);
    completed += hasValue(profile?.country);
    completed += hasValue(profile?.city);
    completed += hasValue(profile?.address);
    completed += hasValue(profile?.postalAddress);
    completed += hasValue(profile?.mobileNum);
    completed += hasValue(profile?.fixedNumber);
    completed += hasValue(profile?.link);
    completed += hasValue(profile?.description);

    setCompletion((completed / totalFields) * 100);
  }, [profile, profileImageFile]);

  useEffect(() => {
    setInitialized(true);
    if (userProfile) {
      console.log(userProfile)
      setProfile({ ...userProfile });
      let array: any[] = [];
      array.push(<option key={"country-key-" + 1} value={""} label={""} />);
      countryList()
        .getData()
        .forEach((value) => {
          array.push(
            <option
              value={value.label}
              key={"country-key-" + value.label}
              label={value.label}
            >
              {value.label}
            </option>
          );
        });
      let idx = codes.findIndex(
        (value) => value.code == userProfile.countryCodeMobileNum
      );
      if (idx > -1) {
        setSelected({
          value: codes[idx].value,
          label: <Flag country={codes[idx].value} />,
        });
        setCountryCode(userProfile.countryCodeMobileNum);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (countryCode && initialized) {
      let tmp = cloneDeep(profile)!;
      tmp.countryCodeMobileNum = countryCode;
      setProfile(tmp);
    }
  }, [countryCode]);

  const onSubmit = () => {
    let formData = new FormData();
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }
    formData.append(
      "updatedIndividualHost",
      new Blob([JSON.stringify(profile)], { type: "application/json" })
    );
    console.log(profile);
    console.log(profileImageFile);
    setIsLoading(true);
    dispatch(
      updateIndividualProfile(formData, setIsLoading, setProfileImageFile)
    );
  };

 

  const buttonEnable = () => {
    return !(
      profile?.postalAddress != userProfile?.postalAddress ||
      profile?.mobileNum != userProfile?.mobileNum ||
      profile?.email != userProfile?.email ||
      profile?.country != userProfile?.country ||
      profile?.city != userProfile?.city ||
      profile?.address != userProfile?.address ||
      profile?.fixedNumber != userProfile?.fixedNumber ||
      profile?.link != userProfile?.link ||
      profile?.description != userProfile?.description ||
      profile?.countryCodeMobileNum != userProfile?.countryCodeMobileNum ||
      profileImageFile
    );
  };

  const handleCancel = () => {
    setProfile({ ...userProfile });
    setClearImage(!clearImage);
    setProfileImageFile(undefined);
  };

  return (
    <div className={"profile"}>
      <form className="profileForm">
        <div className={"profilePicture"}>
          <ProfileImage
            defaultImage={profilePhoto}
            role={Role.INDIVIDUAL_HOST}
            completion={completion}
            name={profile?.name || ""}
            surname={profile?.surname || ""}
            setFile={setProfileImageFile}
            profileImage={profile?.profileImage?.imageUrl}
            clearImage={clearImage}
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
                  Email
                </label>
                <div className="control">
                  <input
                    className={"input border-linear-disabled"}
                    type={"text"}
                    onChange={(e) =>
                      setProfile({
                        ...(profile as IndividualHostProfileDto),
                        email: e.target.value,
                      })
                    }
                    value={profile?.email || ""}
                    disabled
                  />
                </div>
              </div>
              <div className={"field"}>
                <label className="label has-text-primary has-text-weight-medium">
                  Country
                </label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={profile?.country || ""}
                      onChange={(e) =>
                        setProfile({
                          ...(profile as IndividualHostProfileDto),
                          country: e.target.value,
                        })
                      }
                      className={
                        "border-linear " +
                        (profile?.country ? "" : "empty-select")
                      }
                      placeholder={"Select Country"}
                    >
                      {renderNationalities()}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label has-text-primary has-text-weight-medium">
                  City
                </label>
                <div className="control">
                  <input
                    className={"input border-linear"}
                    onChange={(e) =>
                      setProfile({
                        ...(profile as IndividualHostProfileDto),
                        city: e.target.value,
                      })
                    }
                    type={"text"}
                    value={profile?.city || ""}
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
                        onChange={(e) =>
                          setProfile({
                            ...(profile as IndividualHostProfileDto),
                            address: e.target.value,
                          })
                        }
                        type={"text"}
                        value={profile?.address || ""}
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
                        onChange={(e) =>
                          setProfile({
                            ...(profile as IndividualHostProfileDto),
                            postalAddress: e.target.value,
                          })
                        }
                        type={"text"}
                        value={profile?.postalAddress || ""}
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
                        onChange={(e) =>
                          setProfile({
                            ...(profile as IndividualHostProfileDto),
                            mobileNum: e.target.value,
                          })
                        }
                        placeholder="+30 69* *** ****"
                        value={profile?.mobileNum || ""}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className={"field"}>
                <label className="label has-text-primary has-text-weight-medium">
                  Fixed Number
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
                        onChange={(e) =>
                          setProfile({
                            ...(profile as IndividualHostProfileDto),
                            fixedNumber: e.target.value,
                          })
                        }
                        placeholder="000 000 0000"
                        value={profile?.fixedNumber || ""}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={"column is-6"}>
              <div className="field">
                <label className="label has-text-primary has-text-weight-medium">
                  Link
                </label>
                <div className="control">
                  <div className="inputBoxWithPrefix border-linear">
                    <span className="prefix">http://</span>
                    <input
                      className="input"
                      style={{ borderRadius: "0px 8px 8px 0px" }}
                      placeholder="www.example.com"
                      onChange={(e) =>
                        setProfile({
                          ...(profile as IndividualHostProfileDto),
                          link: e.target.value,
                        })
                      }
                      type={"text"}
                      value={profile?.link || ""}
                    />
                  </div>
                  <p className="help has-text-grey">
                    If you are a business, please Insert a link of your website
                    or from platforms such as Booking.com, Trip Advisor,
                    Hostelworld, Airbnb or Couchsurfing. This will help us
                    verify your business.
                  </p>
                </div>
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
                        ...(profile as IndividualHostProfileDto),
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <div className="submitSection">
          <div className="field">
            <p className="control is-fullwidth">
              <button
                className={"button is-secondary is-fullwidth "}
                onClick={handleCancel}
                disabled={buttonEnable()}
                type={"button"}
              >
                Cancel
              </button>
            </p>
          </div>
          <div className="field">
            <p className="control is-fullwidth">
              <button
                className={
                  "button is-primary is-fullwidth " +
                  (isLoading ? "is-loading" : "")
                }
                disabled={buttonEnable()}
                type={"button"}
                onClick={onSubmit}
              >
                Save Profile
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );

};

export default IndividualProfilePage;