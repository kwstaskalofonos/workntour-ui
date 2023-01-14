import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginForm, LoginResponse } from "@src/state/stores/user/models";
import { GenericResponse, login } from "@src/utilities/fetch";
import { toast } from "react-toastify";
import { setCookie } from "@src/utilities/cookies";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@src/state/stores/hooks";
import { doSetRole } from "@src/state/stores/user/operations";
import GoogleSignIn from "./GoogleSignIn";
import AppleSignIn from "./AppleSignIn";
import ForgotPassword from "./ForgotPassword";
// @ts-ignore
import { height } from "@fortawesome/free-solid-svg-icons/faAngleUp";

export interface Props {
  ref: any;
}
export interface PropsLoginContent {
  openRegisterModal: any;
  handleForgotPassword: any;
  setIsActive:any;
}

export interface LoginModalHandler {
  open: () => void;
  close: () => void;
}

const LoginContent: React.FunctionComponent<PropsLoginContent> = ({
  openRegisterModal,
  handleForgotPassword,
  setIsActive,
}) => {
  const { register, handleSubmit, getValues } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pwdEnabled, setPwdEnabled] = useState<boolean>(true);

  const onSubmit: any = (data: LoginForm) => {
    setIsLoading(true);
    login(data.email, data.password)
      .then((response: LoginResponse) => {
        // @ts-ignore
        setCookie(response.memberId, 15);
        // @ts-ignore
        setCookie(response.role, 15, "role");
        setIsLoading(false);
        dispatch(doSetRole(response.role));
        navigate("/");
        setIsActive(false)
      })
      .catch((error) => {
        toast.error(error, { position: toast.POSITION.TOP_RIGHT });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className={"field"}>
        <label className="label has-text-primary has-text-weight-medium is-normal">
          Email
        </label>
        <div className="control">
          <input
            className="input border-linear is-normal"
            type="text"
            {...register("email", { required: true })}
            placeholder="Enter your email"
          />
        </div>
      </div>
      <div className={"field"}>
        <label className="label has-text-primary has-text-weight-medium is-normal">
          Password
        </label>
        <div className="control has-icons-right">
          <input
            className="input border-linear is-normal"
            type={pwdEnabled ? "password" : "text"}
            {...register("password", { required: true })}
            placeholder="Enter your password"
          />
          <span
            className={"icon is-small is-right"}
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            onClick={() => setPwdEnabled(!pwdEnabled)}
          >
            <FontAwesomeIcon icon={faEyeSlash} id={"togglePassword"} />
          </span>
        </div>
      </div>
      <div className="field is-flex is-justify-content-space-between">
        <div className="control">
          <label className="checkbox label is-small has-text-grey-light">
            <input type="checkbox" />
            &nbsp;Remember Me
          </label>
        </div>
        <div className="control">
          <label className="label is-small">
            <a
              className={"has-text-primary is-underlined"}
              onClick={handleForgotPassword}
            >
              Forgot Password
            </a>
          </label>
        </div>
      </div>
      <div className="field mt-2">
        <button
          className={
            "button is-primary is-fullwidth " + (isLoading ? "is-loading" : "")
          }
          type={"submit"}
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </button>
      </div>
      <div className="field mt-2 is-flex is-justify-content-center">OR</div>
      <div className="field mt-2">
        <GoogleSignIn />
      </div>
      <div className="field mt-2">
        <AppleSignIn />
      </div>
      <div className={"field has-text-centered mt-5"}>
        <label className={"label has-text-weight-normal"}>
          New Member?
          <a className={"has-text-info"} onClick={openRegisterModal}>
            Register here
          </a>
        </label>
      </div>
    </>
  );
};

const LoginModal: React.FunctionComponent<Props> =
  forwardRef<LoginModalHandler>(
    (props: {}, ref: React.Ref<LoginModalHandler>) => {
      const [isActive, setIsActive] = useState<boolean>(false);
      const [displayForgotPassword, setDisplayForgotPassword] =
        useState<boolean>(false);

      const handleForgotPassword = () => {
        setDisplayForgotPassword(!displayForgotPassword);
      };

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

      const openRegisterModal = () => {
        // @ts-ignore
        props.modalHandler.current.open();
        setIsActive(false);
      };

      return (
        <div
          className={"modal " + (isActive ? "is-active modal-background" : "")}
        >
          <div className="modal-card">
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
                onClick={() => setIsActive(false)}
              />
            </header>
            <section className={"modal-card-body"}>
              <form className="modalLogin">
                {displayForgotPassword ? (
                  <ForgotPassword
                    handleForgotPassword={handleForgotPassword}
                    openRegisterModal={openRegisterModal}
                  />
                ) : (
                  <LoginContent
                    openRegisterModal={openRegisterModal}
                    handleForgotPassword={handleForgotPassword}
                    setIsActive={setIsActive}
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
            >
              {/* <button className="button" onClick={() => setIsActive(false)}>
                Cancel
              </button> */}
            </footer>
          </div>
        </div>
      );
    }
  );

export default LoginModal;
