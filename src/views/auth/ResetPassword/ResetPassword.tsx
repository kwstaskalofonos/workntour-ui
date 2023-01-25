import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// @ts-ignore
import image from "@src/assets/resetPasswordImage.svg";
// @ts-ignore
import tick from "@src/assets/tick.svg";
// @ts-ignore
import wrong from "@src/assets/wrong.svg";

import {
  isValidLength,
  isContainsUppercase,
  isContainsLowercase,
  isContainsSymbolAndNumber,
} from "@src/utilities/ui";

import { useNavigate } from "react-router";

const PasswordUpdatedNotify: React.FunctionComponent = () => {
  return (
    <>
      <h2 className="has-text-primary is-size-3">Password Updated</h2>
      <div className="field mt-2">
        <button className={"button is-primary is-fullwidth"}>Login</button>
      </div>
    </>
  );
};

const ResetPassword: React.FunctionComponent = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //

  //   }, [])

  const resetPasswordContent = () => {
    return (
      <>
        <div className="mb-5">
          <h2 className="has-text-primary is-size-3">New Credentials</h2>
          <div className="validationBox">
            <img src={isValidLength(password) ? tick : wrong} alt="" />
            <span className="has-text-grey is-size-7">
              Password must be at least 8 characters long.
            </span>
          </div>
          <div className="validationBox">
            <img src={isContainsUppercase(password) ? tick : wrong} alt="" />
            <span className="has-text-grey is-size-7">
              Password must contain at least one uppercase character.
            </span>
          </div>
          <div className="validationBox">
            <img src={isContainsLowercase(password) ? tick : wrong} alt="" />
            <span className="has-text-grey is-size-7">
              Password must contain one lowercase character.
            </span>
          </div>
          <div className="validationBox">
            <img
              src={isContainsSymbolAndNumber(password) ? tick : wrong}
              alt=""
            />
            <span className="has-text-grey is-size-7">
              Password must contain at least one number and a special character.
            </span>
          </div>
        </div>
        <div className={"field"}>
          <label className="label has-text-primary has-text-weight-medium is-normal">
            New Password
          </label>
          <div className="control has-icons-right">
            <input
              className="input border-linear is-normal"
              {...register("password", { required: true })}
              placeholder="Enter your new password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={"field"}>
          <label className="label has-text-primary has-text-weight-medium is-normal">
            Re-type New Password
          </label>
          <div className="control has-icons-right">
            <input
              className="input border-linear is-normal"
              {...register("validPassword", { required: true })}
              placeholder="Re-type your new password"
              type="password"
            />
          </div>
        </div>
        <div className="field mt-2">
          <button
            className={
              "button is-primary is-fullwidth " +
              (isLoading ? "is-loading" : "")
            }
            type="button"
            // onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="section resetPasswordSection">
        <div className="resetPasswordSection-content">
          <form className="resetPasswordSection-item">
            {resetPasswordContent()}
            {/* <PasswordUpdated/> */}
            <div className={"field mt-2"}>
              <label
                className={"label  has-text-centered has-text-weight-normal"}
              >
                <a className={"has-text-info"} onClick={() => navigate("/")}>
                  Go to Home Page
                </a>
              </label>
            </div>
          </form>
          <img className="resetPasswordSection-item" src={image} alt="" />
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
