import React, { useEffect, useState } from "react";
import { CompanyHostProfileDto, Role } from "@src/state/stores/user/models";
import ProfileImage from "@src/views/common/ProfileImage";
// @ts-ignore
import profilePhoto from "@src/assets/hostProfile.png";
import { useAppDispatch, useAppSelector } from "@src/state/stores/hooks";
import countryList from "react-select-country-list";
import CustomSelectCountry from "@src/views/common/CustomSelectCountry";
import Flag from "react-flagkit";
import { countries as codes } from "@src/utilities/countries";
import { updateCompanyProfile } from "@src/state/stores/user/operations";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons/faCloudUpload";
import { renderNationalities } from "@src/utilities/ui";

const CompanyProfilePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(
    (state) =>
      state.session.authenticationSlice
        .profile as unknown as CompanyHostProfileDto
  );

  const [profile, setProfile] = useState<CompanyHostProfileDto>();
  const [selected, setSelected] = useState<{
    value: string;
    label: JSX.Element;
  }>({ value: "GR", label: <Flag country="GR" /> });
  const [countryCode, setCountryCode] = useState<string>("30");
  const [completion, setCompletion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [clearImage, setClearImage] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [authorizedDoc, setAuthorizedDoc] = useState<File>();

  useEffect(() => {
    const totalFields = 13;
    let completed = 0;
    function hasValue(property: any) {
      return property ? 1 : 0;
    }
    completed += hasValue(profileImageFile || profile?.profileImage);
    completed += hasValue(profile?.companyName);
    completed += hasValue(profile?.email);
    completed += hasValue(profile?.country);
    completed += hasValue(profile?.city);
    completed += hasValue(profile?.address);
    completed += hasValue(profile?.postalAddress);
    completed += hasValue(profile?.mobileNum);
    completed += hasValue(profile?.fixedNumber);
    completed += hasValue(profile?.vatNumber);
    completed += hasValue(profile?.authorizedDoc);
    completed += hasValue(profile?.link);
    completed += hasValue(profile?.description);

    setCompletion((completed / totalFields) * 100);
  }, [profile, profileImageFile]);

  useEffect(() => {
    setInitialized(true);
    if (userProfile) {
      console.log(userProfile);
      setProfile({ ...userProfile });
      let array: any = [];
      array.push(<option key={"country-key-" + 1} value={""} label={""} />);
      countryList()
        .getData()
        .forEach((value) => {
          array.push(
            <option
              key={"country-key-" + value.label}
              value={value.label}
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

  const handleChangeAuthDoc = (event: any) => {
    let selected = event.target.files[0];
    setAuthorizedDoc(selected);
  };

  const onSubmit = () => {
    let formData = new FormData();
    formData.append(
      "updatedCompanyHostProfile",
      new Blob([JSON.stringify(profile)], { type: "application/json" })
    );

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }
    if (authorizedDoc) {
      formData.append("authorizedDoc", authorizedDoc);
    }

    console.log(profile);
    console.log(profileImageFile);
    console.log(authorizedDoc);
    setIsLoading(true);
    dispatch(updateCompanyProfile(formData, setIsLoading, setProfileImageFile));
  };

  const authDocPlaceholder = () => {
    if (authorizedDoc) {
      return (
        <>
          <p className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold">
            {authorizedDoc.name}
          </p>
          <FontAwesomeIcon
            className={"has-text-primary"}
            icon={faCloudUpload}
          />
          <span className="file-label has-text-primary has-text-centered is-size-6 has-text-weight-light">
            Or Click to select a new one
          </span>
        </>
      );
    } else if (profile?.authorizedDoc) {
      return (
        <>
          <a
            className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold is-underlined"
            href={profile?.authorizedDoc?.docUrl}
            target="_blank"
          >
            See Your Document
          </a>
          <FontAwesomeIcon
            className={"has-text-primary"}
            icon={faCloudUpload}
          />
          <p className="file-label has-text-primary has-text-centered is-size-6 has-text-weight-light">
            Or Click to upload a new one
          </p>
        </>
      );
    }
    return (
      <>
        <FontAwesomeIcon className={"has-text-primary"} icon={faCloudUpload} />
        <p className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold">
          Click to upload your document
        </p>
        <p className="file-label has-text-primary has-text-centered is-size-6 has-text-weight-light">
          SVG,PNG,JPG or GIF (max. 800x400px)
        </p>
      </>
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
      profile?.vatNumber != userProfile?.vatNumber ||
      profile?.link != userProfile?.link ||
      profile?.description != userProfile?.description ||
      profile?.countryCodeMobileNum != userProfile?.countryCodeMobileNum ||
      profileImageFile ||
      authorizedDoc
    );
  };

  const handleCancel = () => {
    setProfile({ ...userProfile });
    setClearImage(!clearImage);
    setProfileImageFile(undefined);
    setAuthorizedDoc(undefined);
  };

  return (
    <div className={"profile"}>
      <form className="profileForm">
        <div className={"is-flex"}>
          <ProfileImage
            defaultImage={profilePhoto}
            role={Role.COMPANY_HOST}
            completion={completion}
            name={profile?.companyName || ""}
            surname={""}
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
                  Company Name
                </label>
                <div className="control">
                  <input
                    className={"input border-linear-disabled"}
                    disabled
                    type={"text"}
                    value={profile?.companyName || ""}
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
                        ...(profile as CompanyHostProfileDto),
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
                          ...(profile as CompanyHostProfileDto),
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
                        ...(profile as CompanyHostProfileDto),
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
                            ...(profile as CompanyHostProfileDto),
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
                            ...(profile as CompanyHostProfileDto),
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
                            ...(profile as CompanyHostProfileDto),
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
                            ...(profile as CompanyHostProfileDto),
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
                  Vat Number
                </label>
                <div className="control">
                  <input
                    className={"input border-linear"}
                    placeholder="Enter Your Vat Number"
                    onChange={(e) =>
                      setProfile({
                        ...(profile as CompanyHostProfileDto),
                        vatNumber: e.target.value,
                      })
                    }
                    type={"text"}
                    value={profile?.vatNumber || ""}
                  />
                </div>
              </div>
              <div className={"field"}>
                <label className="label has-text-primary has-text-weight-medium">
                  Authorized Person Document
                </label>
                <div className="file is-large is-boxed is-fullwidth">
                  <label className="file-label border-linear-radius">
                    <input
                      className="file-input"
                      type="file"
                      name="resume"
                      accept="application/pdf"
                      onChange={handleChangeAuthDoc}
                    />
                    <span className="file-cta">{authDocPlaceholder()}</span>
                  </label>
                </div>
              </div>
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
                          ...(profile as CompanyHostProfileDto),
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
                        ...(profile as CompanyHostProfileDto),
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

export default CompanyProfilePage;
