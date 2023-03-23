import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isEmail } from "@src/utilities/ui";
import { ForgotPassword } from "@src/state/stores/user/models";
import SelectRegistrationModal, {
  SelectRegistrationModalHandler,
} from "@src/views/auth/SelectRegistrationModal";
import { changeUserPassword } from "@src/state/stores/user/operations";

interface Props {
  handleForgotPassword: any;
  openRegisterModal: any;
  closeModal: any;
}

const ForgotPassword: React.FunctionComponent<Props> = ({
  handleForgotPassword,
  openRegisterModal,
  closeModal,
}) => {
  const registrationModalHandler = useRef<SelectRegistrationModalHandler>();
  const { register, handleSubmit, getValues } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onSubmit: any = (data: ForgotPassword) => {
    if (!isEmail(data.email)) {
      toast.error("Input is not valid email address.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setIsLoading(true);
    changeUserPassword(data.email).then(() => {
      toast.success("Email sent successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      closeModal();
      navigate("/check-inbox", {
        state: { email: data.email, forgotPassword: true },
      });
    });
  };
  return (
    <>
      {/* {displayForgotPassword && ( */}
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
          <p className="help has-text-grey">
            Please provide your account's email to reset your password
          </p>
        </div>
        <div className="field mt-2">
          <button
            className={
              "button is-primary is-fullwidth " +
              (isLoading ? "is-loading" : "")
            }
            type={"submit"}
            onClick={handleSubmit(onSubmit)}
          >
            Reset Password
          </button>
        </div>
        <div className={"field has-text-centered mt-5"}>
          <label className={"label has-text-weight-normal"}>
            New Member?
            <a className={"has-text-info"} onClick={openRegisterModal}>
              Register here
            </a>
          </label>
        </div>
        <div className={"field has-text-centered mt-5"}>
          <label className={"label has-text-weight-normal"}>
            <a className={"has-text-info"} onClick={handleForgotPassword}>
              Go back to login
            </a>
          </label>
        </div>
      </>
      <SelectRegistrationModal ref={registrationModalHandler} />
      {/* )} */}
    </>
  );
};

export default ForgotPassword;
