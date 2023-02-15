import React, { useState } from "react";
import {
  TravelerProfileDTO,
  ProfileExperience,
  Experience,
  TypeOfExperience,
} from "@src/state/stores/user/models";

import { toast } from "react-toastify";
import { useAppDispatch } from "@src/state/stores/hooks";
import { updateTravelerProfile } from "@src/state/stores/user/operations";

export interface Props {
  setActive: any;
  travelerProfile: TravelerProfileDTO;
  setTravelerProfile: any;
}

const ExperienceModal: React.FunctionComponent<Props> = ({
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

  const [experienceObj, setExperienceObj] = useState<Experience>({
    typeOfExperience: TypeOfExperience.COMPANY,
    position: "",
    nameOfOrganisation: "",
    startedOn: "",
    endedOn: "",
    description: "",
  });

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File>();

  let experienceArray: ProfileExperience[] = [];
  if (travelerProfile.experience) {
    experienceArray = [...travelerProfile.experience];
  }

  const handleAddExperience = () => {
    if (
      experienceObj.position === "" ||
      experienceObj.nameOfOrganisation === "" ||
      experienceObj.startedOn === "" ||
      experienceObj.endedOn === ""
    ) {
      toast.error("Empty Fields");
      return;
    }
    console.log(experienceObj);
    let temObjToPush: ProfileExperience = {
      experienceId: Date.now().toString(), // unique ID
      experience: {
        ...experienceObj,
      },
    };
    experienceArray.push(temObjToPush);
    let tempProfile: any = { ...travelerProfile };

    setTravelerProfile({
      ...travelerProfile,
      experience: experienceArray,
    });

    console.log(experienceArray);

    tempProfile.experience = [...experienceArray];
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
            Experience
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setActive(false)}
          ></button>
        </header>
        <section className={"modal-card-body"}>
          <div className={"is-flex is-justify-content-center"}>
            <div className="field checkBoxWithLabel">
              <input
                id="category1"
                className="profileCheckbox"
                type="radio"
                name="category"
                value="COMPANY"
                checked={
                  experienceObj.typeOfExperience === TypeOfExperience.COMPANY
                }
                onChange={(e) =>
                  setExperienceObj({
                    ...experienceObj,
                    typeOfExperience: TypeOfExperience.COMPANY,
                  })
                }
              />
              <label htmlFor="category1">Professional</label>
            </div>
            <div className="field checkBoxWithLabel">
              <input
                className="profileCheckbox"
                id="category2"
                type="radio"
                name="category"
                checked={
                  experienceObj.typeOfExperience === TypeOfExperience.UNIVERSITY
                }
                onChange={(e) =>
                  setExperienceObj({
                    ...experienceObj,
                    typeOfExperience: TypeOfExperience.UNIVERSITY,
                  })
                }
              />
              <label htmlFor="category2">Education</label>
            </div>
          </div>
          <div className={"field is-horizontal"}>
            <div className={"field-body"}>
              <div className="field">
                <label className="label has-text-primary has-text-weight-medium">
                  {experienceObj.typeOfExperience === TypeOfExperience.COMPANY
                    ? "Company*"
                    : "University*"}
                </label>
                <div className="control">
                  <input
                    className={"input border-linear"}
                    placeholder={"Enter your company"}
                    type={"text"}
                    value={experienceObj.nameOfOrganisation}
                    onChange={(e) =>
                      setExperienceObj({
                        ...experienceObj,
                        nameOfOrganisation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-primary has-text-weight-medium">
                  {experienceObj.typeOfExperience === TypeOfExperience.COMPANY
                    ? "Position*"
                    : "Field Of Study*"}
                </label>
                <div className="control">
                  <input
                    className={"input border-linear"}
                    placeholder={"Enter your position"}
                    type={"text"}
                    value={experienceObj.position}
                    onChange={(e) =>
                      setExperienceObj({
                        ...experienceObj,
                        position: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"field is-horizontal"}>
            <div className={"field-body"}>
              <div className="field">
                <label className="label has-text-primary has-text-weight-medium">
                  Start Date*
                </label>
                <div className="control">
                  <input
                    className={"input border-linear"}
                    placeholder={"Enter your company"}
                    type={"date"}
                    pattern={"yyyy-MM-dd"}
                    lang={"fr-CA"}
                    value={experienceObj.startedOn}
                    onChange={(e) =>
                      setExperienceObj({
                        ...experienceObj,
                        startedOn: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-primary has-text-weight-medium">
                  End Date*
                </label>
                <div className="control">
                  <input
                    className={"input border-linear"}
                    placeholder={"Enter your position"}
                    type={"date"}
                    pattern={"yyyy-MM-dd"}
                    value={experienceObj.endedOn}
                    onChange={(e) =>
                      setExperienceObj({
                        ...experienceObj,
                        endedOn: e.currentTarget.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"field"}>
            <label className="label has-text-primary has-text-weight-medium">
              Description
            </label>
            <div className={"control"}>
              <textarea
                className={"textarea border-linear"}
                value={experienceObj.description}
                onChange={(e) =>
                  setExperienceObj({
                    ...experienceObj,
                    description: e.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <p className={"is-size-7 has-text-weight-semibold"}>
            By adding your background, you will increase your chances of being
            accepted by a host.
          </p>
        </section>
        <footer
          className="modal-card-foot is-justify-content-center"
          style={footerStyle}
        >
          <button
            className={"button has-text-white has-background-primary"}
            onClick={handleAddExperience}
          >
            Add Experience
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ExperienceModal;
