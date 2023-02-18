import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import logo from "@src/assets/Frame.svg";
import SelectRegistrationModal, {
  SelectRegistrationModalHandler,
} from "@src/views/auth/SelectRegistrationModal";
import LoginModal from "../auth/Login/LoginModal";
import {
  deleteCookie,
  deleteSpecificCookie,
  hasCookie,
} from "@src/utilities/cookies";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserDisplayName, isHost } from "@src/utilities/ui";
import { useAppSelector } from "@src/state/stores/hooks";
import { Role, TravelerProfileDTO } from "@src/state/stores/user/models";
import { clearRefData, SessionStorage } from "@src/utilities/localStorage";

import styles from "./TopMenu.module.scss";

const TopMenu: React.FunctionComponent = () => {
  const registrationModalHandler = useRef<SelectRegistrationModalHandler>();
  const isAuthenticated = hasCookie();
  const role = useAppSelector(
    (state) => state.session.authenticationSlice.role
  );
  const userProfile = useAppSelector(
    (state) => state.session.authenticationSlice.profile
  );
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [loginDialog, setLoginDialog] = useState<boolean>(false);

  // for the blog
  const user = userProfile as unknown as TravelerProfileDTO;
  //

  const logout = () => {
    deleteCookie();
    clearRefData();
    deleteSpecificCookie("role");
    deleteSpecificCookie("profile");
    window.location.replace("/");
  };

  const retrieveName = () => {
    if (role && role == Role.COMPANY_HOST.toString() && userProfile) {
      // @ts-ignore
      return userProfile.companyName;
    }
    if (role && role != Role.COMPANY_HOST.toString() && userProfile) {
      // @ts-ignore
      return userProfile.name;
    }
  };

  return (
    <React.Fragment>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
        style={{
          boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.15)",
          position: "fixed",
          zIndex: 5,
          width: "100%",
          height: "60px",
        }}
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            {/*<img src={logo} width="190" height="28"/>*/}
            <img src={logo} />
          </a>

          <a
            role="button"
            className={"navbar-burger " + (isNavOpen ? "is-active" : "")}
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navbarBasicExample"
          className={"navbar-menu " + (isNavOpen ? "is-active" : "")}
        >
          <div className="navbar-start">
            {!isAuthenticated && (
              <React.Fragment>
                <a className="navbar-item" href="/">
                  Home
                </a>
                <a className="navbar-item" href="/about">
                  About Us
                </a>
                <a className="navbar-item" href="/blog">
                  Blog
                </a>
              </React.Fragment>
            )}
            {isHost() && (
              <>
                <a className="navbar-item" href={"/"}>
                  Opportunities
                </a>
                <a className="navbar-item" href={"/blog"}>
                  Blog
                </a>
              </>
            )}
          </div>
          <div className="navbar-end">
            {!isAuthenticated ? (
              <div className="navbar-item">
                <div className="buttons">
                  <a
                    className="button is-primary"
                    onClick={() => {
                      setLoginDialog(true);
                      setIsNavOpen(false);
                    }}
                  >
                    Log In
                  </a>
                  <a
                    className="button is-outlined"
                    style={{
                      border: "1px solid #7E6FD8",
                      color: "#7E6FD8",
                    }}
                    onClick={() => {
                      registrationModalHandler.current?.open();
                      setIsNavOpen(false);
                    }}
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            ) : (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className={`navbar-link ${styles.hideElement}`}>
                  <span className={"icon"}>
                    <FontAwesomeIcon
                      className={"has-text-primary fa-xl"}
                      icon={faUserCircle}
                    />
                  </span>
                </a>

                <div className="navbar-dropdown is-right">
                  <p className="navbar-item has-text-weight-semibold has-text-primary">
                    Singed in as {retrieveName()}
                  </p>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" href={"profile"}>
                    Profile
                  </a>
                  <hr className="navbar-divider" />
                  {user?.email === "traveler.workntour@gmail.com" ? (
                    <>
                      <a className="navbar-item" href={"shareArticle"}>
                        Create an article
                      </a>
                      <hr className="navbar-divider" />
                    </>
                  ) : null}

                  <a className="navbar-item" onClick={() => logout()}>
                    Log out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <SelectRegistrationModal ref={registrationModalHandler} />
      {loginDialog && (
        <LoginModal
          setLoginDialog={setLoginDialog}
          registrationModalHandler={registrationModalHandler}
        />
      )}
    </React.Fragment>
  );
};

export default TopMenu;
