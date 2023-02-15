import React, { useState } from "react";
import {
  LanguageProficiency,
  LanguageProficiencyType,
  Languages,
  LanguagesType,
} from "@src/state/stores/opportunity/models";
import {
  TravelerProfileDTO,
  ProfileLanguage,
} from "@src/state/stores/user/models";

import { toast } from "react-toastify";
import { useAppDispatch } from "@src/state/stores/hooks";
import { updateTravelerProfile } from "@src/state/stores/user/operations";

export interface Props {
  setActive: any;
  travelerProfile: TravelerProfileDTO;
  setTravelerProfile: any;
}

const LanguagesModal: React.FunctionComponent<Props> = ({
  setActive,
  travelerProfile,
  setTravelerProfile,
}) => {
  const headerStyle = {
    backgroundColor: "white",
    borderBottom: "2px solid #8970FA",
  };
  const footerStyle = {
    backgroundColor: "white",
    borderTop: "none",
  };

  const [languageObj, setLanguageObj] = useState<ProfileLanguage>({
    languages: undefined,
    languageProficiency: undefined,
  });

  let languagesArray: ProfileLanguage[] = [];
  if (travelerProfile.language) {
    languagesArray = [...travelerProfile.language];
  }

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File>();

  const renderLanguages = () => {
    let array: any[] = [];
    array.push(
      <option
        key={"language-option-empty"}
        value={""}
        label={"Select language"}
        disabled
      />
    );
    for (const language in Languages) {
      array.push(
        <option
          key={"language-option-empty-" + language}
          value={language}
          label={Languages[language as LanguagesType]}
        >
          {Languages[language as LanguagesType]}
        </option>
      );
    }
    return array;
  };

  const renderLevel = () => {
    let array: any[] = [];
    array.push(
      <option
        key={"language-option-empty"}
        value={""}
        label={"Select the level"}
        disabled
      />
    );
    for (const level in LanguageProficiency) {
      array.push(
        <option
          key={"language-option-empty-" + level}
          value={level}
          label={LanguageProficiency[level as LanguageProficiencyType]}
        >
          {LanguageProficiency[level as LanguageProficiencyType]}
        </option>
      );
    }
    return array;
  };

  const handleAddLanguage = () => {
    if (!languageObj.languages || !languageObj.languageProficiency) {
      toast.error("Empty Fields");
      return;
    }
    if (
      languagesArray.find((lang) => lang.languages === languageObj.languages)
    ) {
      toast.error("Language already exists!");
      return;
    }
    console.log(languageObj);
    languagesArray.push(languageObj);
    let tempProfile: any = { ...travelerProfile };
    setTravelerProfile({
      ...travelerProfile,
      language: languagesArray,
    });

    console.log(languagesArray);
    tempProfile.language = [...languagesArray];
    let formData = new FormData();
    formData.append(
      "updatedTravelerProfile",
      new Blob([JSON.stringify(tempProfile)], { type: "application/json" })
    );
    console.log(tempProfile);
    setIsLoading(true);
    dispatch(
      updateTravelerProfile(formData, setIsLoading, setProfileImageFile)
    );
    setActive(false);
  };

  return (
    <div className={"modal is-active"}>
      <div className="modal-background"></div>
      <div className={"modal-card"}>
        <header className={"modal-card-head"} style={headerStyle}>
          <p className="modal-card-title has-text-weight-semibold has-text-primary">
            Languages
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setActive(false)}
          ></button>
        </header>
        <section className={"modal-card-body"}>
          <div className={"columns"}>
            <div className={"column"}>
              <div className="field">
                <label className="label has-text-primary has-text-weight-medium">
                  Languages
                </label>
                <div className={"select is-fullwidth"}>
                  <select
                    className={"border-linear"}
                    value={languageObj.languages || ""}
                    onChange={(e) =>
                      setLanguageObj({
                        ...(languageObj as ProfileLanguage),
                        languages: e.target.value as any,
                      })
                    }
                  >
                    {renderLanguages()}
                  </select>
                </div>
              </div>
            </div>
            <div className={"column"}>
              <label className="label has-text-primary has-text-weight-medium">
                Level
              </label>
              <div className={"select is-fullwidth"}>
                <select
                  className={"border-linear"}
                  value={languageObj.languageProficiency || ""}
                  onChange={(e) =>
                    setLanguageObj({
                      ...(languageObj as ProfileLanguage),
                      languageProficiency: e.target.value as any,
                    })
                  }
                >
                  {renderLevel()}
                </select>
              </div>
            </div>
          </div>
        </section>
        <footer
          className="modal-card-foot is-justify-content-center"
          style={footerStyle}
        >
          <button
            className={
              "button has-text-white has-background-primary" +
              (isLoading ? "is-loading" : "")
            }
            onClick={handleAddLanguage}
          >
            Add Language
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LanguagesModal;
