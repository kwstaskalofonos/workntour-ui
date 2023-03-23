import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import ForgotPassword from "./ForgotPassword";
import LoginContent from "./LoginContent";
// @ts-ignore
import { height } from "@fortawesome/free-solid-svg-icons/faAngleUp";

export interface Props {
  setLoginDialog: any;
  registrationModalHandler: any;
}

export interface LoginModalHandler {
  open: () => void;
  close: () => void;
}

const LoginModal: React.FunctionComponent<Props> = ({
  setLoginDialog,
  registrationModalHandler,
}) => {
  const [displayForgotPassword, setDisplayForgotPassword] =
    useState<boolean>(false);

  const handleForgotPassword = () => {
    setDisplayForgotPassword(!displayForgotPassword);
  };

  const openRegisterModal = () => {
    // @ts-ignore
    registrationModalHandler.current?.open();
    setLoginDialog(false);
  };

  const handleCloseModal = () => {
    setLoginDialog(false);
    setDisplayForgotPassword(false);
  };

  return (
    <div
      className={"modal is-active modal-background p-5"}
      onClick={handleCloseModal}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <header
          className={"modal-card-head"}
          style={{
            backgroundColor: "white",
            borderBottom: "1px solid #8970FA",
          }}
        >
          <p className="modal-card-title is-4 has-text-weight-bold has-text-primary is-flex is-justify-content-center">
            Log in to your account
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleCloseModal}
          />
        </header>
        <section className={"modal-card-body"}>
          <form className="modalLogin">
            {displayForgotPassword ? (
              <ForgotPassword
                handleForgotPassword={handleForgotPassword}
                openRegisterModal={openRegisterModal}
                closeModal={handleCloseModal}
              />
            ) : (
              <LoginContent
                openRegisterModal={openRegisterModal}
                handleForgotPassword={handleForgotPassword}
                setIsActive={setLoginDialog}
              />
            )}
          </form>
        </section>
        <footer
          className="modal-card-foot"
          style={{
            backgroundColor: "white",
            border: 0,
          }}
        ></footer>
      </div>
    </div>
  );
};

export default LoginModal;
