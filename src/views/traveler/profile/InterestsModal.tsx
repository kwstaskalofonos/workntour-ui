import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { TravelerProfileDTO } from "@src/state/stores/user/models";
import {
  LearningOpportunities,
  LearningOpportunitiesType,
} from "@src/state/stores/opportunity/models";
import TravelerProfilePage from "./TravelerProfilePage";

export interface Props {
  ref: any;
  travelerProfile: TravelerProfileDTO;
  setTravelerProfile: any;
}

export interface InterestsModalHandler {
  open: () => void;
  close: () => void;
}

const InterestsModal: React.FunctionComponent<Props> =
  forwardRef<InterestsModalHandler>(
    (props: { travelerProfile: any; setTravelerProfile: any }, ref) => {
      const [isActive, setIsActive] = useState<boolean>(false);
      const [selected, setSelected] = useState<boolean[]>(
        Array<boolean>(Object.keys(LearningOpportunities).length).fill(false)
      );
      let interestsTemp: string[] = [...props.travelerProfile.interests];

      useImperativeHandle(ref, () => {
        return {
          open: () => {
            setIsActive(true);
          },
          close: () => {
            setIsActive(false);
          },
        };
      });

      useEffect(() => {
        if (props.travelerProfile.interests) {
          let newSelected: boolean[] = { ...selected };
          const interests: string[] = Object.values(LearningOpportunities);

          for (let interest of props.travelerProfile?.interests) {
            if (LearningOpportunities[interest as LearningOpportunitiesType]) {
              let index: number = interests.indexOf(interest);
              newSelected[index] = true;
            }
          }
          setSelected(newSelected);
        }
      }, []);

      const renderInterests = () => {
        let interestsOptionsArray: any[] = [];
        const interests = Object.values(LearningOpportunities);

        interestsOptionsArray = interests.map(
          (interest: any, index: number) => (
            <span
              key={"opportunity-category-" + interest}
              className={
                "tag is-primary m-1 is-light" +
                (selected[index] ? "selectedTag" : "")
              }
              onClick={() => {
                let newSelected: boolean[] = { ...selected };
                newSelected[index] = !newSelected[index];
                setSelected(newSelected);
                if (newSelected[index]) {
                  interestsTemp.push(interest),
                    props.setTravelerProfile({
                      ...props.travelerProfile,
                      interests: interestsTemp,
                    });
                } else {
                  interestsTemp.splice(
                    props.travelerProfile?.interests.indexOf(interest),
                    1
                  );
                  props.setTravelerProfile({
                    ...props.travelerProfile,
                    interests: interestsTemp,
                  });
                }
                console.log(interestsTemp);
              }}
            >
              {interest.toLowerCase().replace("_", " ")}
            </span>
          )
        );
        return interestsOptionsArray;
      };

      const headerStyle = {
        backgroundColor: "white",
        borderBottom: "2px solid #8970FA",
      };
      const footerStyle = {
        backgroundColor: "white",
        borderTop: "none",
      };

      return (
        <div className={"modal " + (isActive ? "is-active" : "")}>
          <div className="modal-background"></div>
          <div className={"modal-card"}>
            <header className={"modal-card-head"} style={headerStyle}>
              <p className="modal-card-title has-text-weight-semibold has-text-primary">
                Interests
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setIsActive(false)}
              ></button>
            </header>
            <section className={"modal-card-body"}>
              <div className={"is-flex is-justify-content-space-between"}>
                <p className={"is-size-7 has-text-weight-semibold"}>
                  Add your interests so you can match with the perfect host!
                  Choose a minimum of 3.
                </p>
                <p className={"is-size-7 has-text-weight-semibold"}>
                  {props.travelerProfile.interests.length}/
                  {Object.values(LearningOpportunities).length}
                </p>
              </div>
              <div
                className={"field is-grouped is-grouped-multiline mt-4"}
                style={{ borderRadius: "8px", cursor: "pointer" }}
              >
                {renderInterests()}
              </div>
            </section>
            <footer
              className="modal-card-foot is-justify-content-center"
              style={footerStyle}
            >
              <button
                className={"button has-text-white has-background-primary"}
                onClick={() => setIsActive(false)}
              >
                Add Interests
              </button>
            </footer>
          </div>
        </div>
      );
    }
  );

export default InterestsModal;
