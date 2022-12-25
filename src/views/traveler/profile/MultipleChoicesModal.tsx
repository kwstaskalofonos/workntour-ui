import React, { useEffect, useState } from "react";
import { TravelerProfileDTO } from "@src/state/stores/user/models";
import { LearningOpportunities } from "@src/state/stores/opportunity/models";
import { TypeOfHelpNeeded } from "@src/state/stores/opportunity/models";

export interface Props {
  setActive: any;
  travelerProfile: TravelerProfileDTO;
  setTravelerProfile: any;
  kindOfContent: string;
}

const MultipleChoicesModal: React.FunctionComponent<Props> = ({
  setActive,
  travelerProfile,
  setTravelerProfile,
  kindOfContent,
}) => {
  const currentEnum: any =
    kindOfContent === "interests" ? LearningOpportunities : TypeOfHelpNeeded;
  const [selected, setSelected] = useState<boolean[]>(
    Array<boolean>(Object.keys(currentEnum).length).fill(false)
  );
  let tempArray: string[] = [];
  if ((travelerProfile as any)[kindOfContent])
    tempArray = [...(travelerProfile as any)[kindOfContent]];

  useEffect(() => {
    function setSelectedChoices(choices: any) {
      let newSelected: boolean[] = { ...selected };
      const options: string[] = Object.values(choices);
      for (let option of (travelerProfile as any)[kindOfContent]) {
        if (currentEnum[option as any]) {
          let index: number = options.indexOf(option);
          newSelected[index] = true;
        }
      }
      setSelected(newSelected);
    }

    if ((travelerProfile as any)[kindOfContent]) {
      setSelectedChoices(currentEnum);
    }
  }, []);

  const renderOptions = () => {
    let optionsArray: any[] = [];
    const options = Object.values(currentEnum);

    optionsArray = options.map((option: string, index: number) => (
      <span
        key={"opportunity-category-" + option}
        className={
          "tag is-primary m-1 is-light" + (selected[index] ? "selectedTag" : "")
        }
        onClick={() => {
          let newSelected: boolean[] = { ...selected };
          newSelected[index] = !newSelected[index];
          setSelected(newSelected);
          if (newSelected[index]) {
            tempArray.push(option),
              setTravelerProfile({
                ...travelerProfile,
                [kindOfContent]: tempArray,
              });
          } else {
            tempArray.splice(
              (travelerProfile as any)[kindOfContent]?.indexOf(option),
              1
            );
            setTravelerProfile({
              ...travelerProfile,
              [kindOfContent]: tempArray,
            });
          }
          console.log(tempArray);
        }}
      >
        {option.toLowerCase().replace("_", " ")}
      </span>
    ));
    return optionsArray;
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
    <div className={"modal is-active"}>
      <div className="modal-background"></div>
      <div className={"modal-card"}>
        <header className={"modal-card-head"} style={headerStyle}>
          <p className="modal-card-title has-text-weight-semibold has-text-primary">
            {kindOfContent}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => setActive(false)}
          ></button>
        </header>
        <section className={"modal-card-body"}>
          <div className={"is-flex is-justify-content-space-between"}>
            <p className={"is-size-7 has-text-weight-semibold"}>
              Add your {kindOfContent} so you can match with the perfect host!
              Choose a minimum of 3.
            </p>
            <p className={"is-size-7 has-text-weight-semibold"}>
              {tempArray.length}/{Object.values(currentEnum).length}
            </p>
          </div>
          <div
            className={"field is-grouped is-grouped-multiline mt-4"}
            style={{ borderRadius: "8px", cursor: "pointer" }}
          >
            {renderOptions()}
          </div>
        </section>
        <footer
          className="modal-card-foot is-justify-content-center"
          style={footerStyle}
        >
          <button
            className={"button has-text-white has-background-primary"}
            onClick={() => setActive(false)}
          >
            Add {kindOfContent}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MultipleChoicesModal;
