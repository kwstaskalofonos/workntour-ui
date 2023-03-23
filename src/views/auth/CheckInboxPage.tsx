import React from "react";
// @ts-ignore
import checkInbox from "@src/assets/checkInboxPng.png";
// @ts-ignore
import { useLocation } from "react-router";
import { Navigate } from "react-router";

const CheckInboxPage: React.FunctionComponent = () => {
  const location = useLocation();
  if (!location.state?.email) return <Navigate to="/" />;

  return (
    <React.Fragment>
      <section
        className={"section has-background-primary-light"}
        style={{ minHeight: "82vh" }}
      >
        <div className={"columns is-centered"}>
          <div className={"column is-4"}>
            <div className="field mb-5 has-text-centered mt-6">
              <h1 className={"title has-text-weight-bold mb-2"}>
                Check you Inbox
              </h1>
              <p className={"is- has-text-weight-normal mt-4"}>
                Click the link to <strong>{location.state.email}</strong> <br />
                to
                {location.state.forgotPassword
                  ? " reset your password"
                  : " sign in"}
                .
              </p>
            </div>
            <div className={"is-flex is-justify-content-center"}>
              <figure className={"image is-expanded is-fullwidth"}>
                <img src={checkInbox} />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CheckInboxPage;
