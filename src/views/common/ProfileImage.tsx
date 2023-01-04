import React, { useEffect, useState } from "react";
import { Role } from "@src/state/stores/user/models";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  defaultImage: any;
  role: Role;
  name: string;
  surname: string;
  completion: number;
  setFile: any;
  profileImage?: string;
  clearImage?: boolean;
}

const ProfileImage: React.FunctionComponent<Props> = ({
  defaultImage,
  role,
  name,
  surname,
  completion,
  setFile,
  profileImage,
  clearImage,
}) => {
  const [imagePath, setImagePath] = useState<any>();
  const [type, setType] = useState<string>("");

  useEffect(() => {
    switch (role) {
      case Role.TRAVELER: {
        setType("Traveler");
        break;
      }
      case Role.INDIVIDUAL_HOST: {
        setType("Individual");
        break;
      }
      case Role.COMPANY_HOST: {
        setType("Company");
        break;
      }
    }
  }, []);

  useEffect(() => {
    setImagePath("");
  }, [clearImage]);

  const image = () => imagePath || profileImage || defaultImage;

  const handleChangeImage = (event: any) => {
    let selected = event.target.files[0];
    let reader = new FileReader();
    let imgTag = document.getElementById("profile");
    if (imgTag) {
      imgTag.title = selected.name;
      reader.readAsDataURL(selected);
      setFile(selected);
      reader.onload = (event) => {
        if (event && event.target && imgTag) {
          setImagePath(event.target.result);
        }
      };
    }
  };

  const isPerson = () => {
    return role == Role.TRAVELER || role == Role.INDIVIDUAL_HOST;
  };

  const calculateCompletion = () => {
    if (completion) {
      let tmp = Math.ceil(completion);
      if (completion > 100) {
        return 100;
      }
      return tmp;
    }
    return 100;
  };

  return (
    <>
      <div className="profilePhoto">
        <figure className={"is-flex image is-128x128 mb-5"}>
          <input
            className={"file-input"}
            type={"file"}
            name={"profile"}
            id={"profile"}
            style={{ width: "100%", height: "100%", zIndex: 1 }}
            accept={"image/*"}
            onChange={handleChangeImage}
          />
          <div
            className={"profile"}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <svg
              className="profileProgressRing"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              data-value="75"
            >
              <circle
                className="profileProgressRing-stroke"
                r="45"
                cx="50"
                cy="50"
              />
              <path
                className="profileProgressRing-meter"
                d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="url(#cl1)"
                strokeDashoffset={
                  282.78302001953125 * ((100 - completion) / 100)
                }
                strokeDasharray="282.78302001953125"
              />
              <linearGradient
                id="cl1"
                gradientUnits="objectBoundingBox"
                x1="0"
                y1="1"
                x2="0"
                y2="0"
              >
                <stop stopColor="#0EE5D0" />
                <stop offset="100%" stopColor="#7E6FD8" />
              </linearGradient>
            </svg>
            <img
              className={"is-rounded"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={image()}
            />
          </div>
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "113px",
              height: "27px",
            }}
            className="tag has-text-white is-info has-text-weight-semibold background-linear is-normal"
          >
            {completion
              ? calculateCompletion() + "% Complete"
              : "100% Complete"}
          </span>
          <div
            style={{
              position: "absolute",
              width: "22%",
              height: "22%",
              top: "4px",
              right: "3px",
            }}
            className={"border-plus-button"}
          />
          <FontAwesomeIcon
            style={{ position: "absolute", top: "10px", right: "10px" }}
            className={"has-text-info"}
            icon={faPlus}
          />
        </figure>
        <div
          className={"is-flex ml-5 mr-5 is-flex is-flex-direction-column"}
          style={{ position: "relative" }}
        >
          <p className="has-text-primary has-text-weight-semibold is-size-4-desktop profileUsername">
            {name ? name : ""}
          </p>
          {isPerson() && (
            <p className="has-text-primary has-text-weight-semibold is-size-4-desktop profileUsername">
              {surname ? surname : ""}
            </p>
          )}
          {isPerson() ? (
            <span className="tag is-info has-text-weight-semibold">{type}</span>
          ) : (
            <span className="tag is-info has-text-weight-semibold">{type}</span>
          )}
        </div>
      </div>
      <div className="profileSectionMoto">
        <div className="horizontalLine" />
        {role === Role.TRAVELER ? (
          <p className={"profileSectionMoto-text"}>
            <b style={{ fontWeight: 600, color: "#8870F9" }}>Don't be shy!</b>{" "}
            Workntour is all about getting to know new people, so please
            introduce yourself to us and to your potential hosts!
          </p>
        ) : (
          <p className={"profileSectionMoto-text"}>
            <b style={{ fontWeight: 600, color: "#8870F9" }}>Introduce yourself to us</b>, so that we can go ahead and promote the
            opportunities that you have to offer. Please indicate what type of
            host you are and tell us about your project or business to help us
            understand your needs.
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileImage;
