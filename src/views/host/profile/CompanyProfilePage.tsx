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
import { getNationalities } from "@src/utilities/ui";

const CompanyProfilePage: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(
    (state) =>
      state.session.authenticationSlice
        .profile as unknown as CompanyHostProfileDto
  );

  const [countries, setCountries] = useState<any>("");
  const [profile, setProfile] = useState<CompanyHostProfileDto>();
  const [selected, setSelected] = useState<{
    value: string;
    label: JSX.Element;
  }>({ value: "GR", label: <Flag country="GR" /> });
  const [countryCode, setCountryCode] = useState<string>("30");
  const [completion, setCompletion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const totalField = 13;
    let completed = 0;
    function hasValue(property:any){
      return property ? 1 : 0
    }
    completed += hasValue(userProfile?.profileImage);
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

    setCompletion((completed / totalField) * 100);
  }, [profile, profileImageFile]);

  useEffect(() => {
    setInitialized(true);
    if (userProfile) {
      console.log(userProfile);
      setProfile({
        memberId: userProfile.memberId,
        companyName: userProfile.companyName,
        role: userProfile.role,
        description: userProfile.description,
        email: userProfile.email,
        countryCodeMobileNum: userProfile.countryCodeMobileNum,
        mobileNum: userProfile.mobileNum,
        address: userProfile.address,
        city: userProfile.city,
        country: userProfile.country,
        postalAddress: userProfile.postalAddress,
        profileImage: userProfile.profileImage,
        authorizedDoc: userProfile.authorizedDoc,
        link: userProfile.link,
        fixedNumber: userProfile.fixedNumber,
        vatNumber: userProfile.vatNumber,
      });
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
      setCountries(array);
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

  const renderNationalities = () => {
    let array: any[] = [];
    array.push(
      <option
        key={"nationality-option-empty-1"}
        value={""}
        label={"Select Country"}
        disabled
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

  const onSubmit = () => {
    let formData = new FormData();
    formData.append(
      "updatedCompanyHostProfile",
      new Blob([JSON.stringify(profile)], { type: "application/json" })
    );
    formData.append("profileImage","www")
    formData.append("authorizedDoc", "www");
    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    console.log(profileImageFile);
    console.log(profile);
    setIsLoading(true);
    dispatch(updateCompanyProfile(formData, setIsLoading, setProfileImageFile));
  };

  useEffect(() => {
    if (profile && initialized) {
      if (
        profile.postalAddress != userProfile.postalAddress ||
        countryCode != userProfile.countryCodeMobileNum ||
        profile.mobileNum != userProfile.mobileNum ||
        profile.fixedNumber != userProfile.fixedNumber ||
        profileImageFile
      ) {
        setDisabled(false);
        return;
      }
      setDisabled(true);
    }
  }, [profile, profileImageFile]);

  return (
    <div className={"profile"}>
      <form
        className="is-flex is-flex-direction-column is-justify-content-center"
        style={{ padding: "2% 15%" }}
      >
        <div className={"is-flex"}>
          <ProfileImage
            defaultImage={profilePhoto}
            role={Role.COMPANY_HOST}
            completion={completion}
            name={profile?.companyName || ""}
            surname={""}
            setFile={setProfileImageFile}
            profileImage={profile?.profileImage?.imageUrl}
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
                    <input className="file-input" type="file" name="resume" />
                    <span className="file-cta">
                      <FontAwesomeIcon
                        className={"has-text-primary"}
                        icon={faCloudUpload}
                      />
                      <span className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold">
                        Click to upload your file
                      </span>
                      <p className="file-label has-text-primary has-text-centered is-size-6 has-text-weight-light">
                        SVG,PNG,JPG or GIF (max. 800x400px)
                      </p>
                    </span>
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
                  ></textarea>
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
  );
};

export default CompanyProfilePage;
