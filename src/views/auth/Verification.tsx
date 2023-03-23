import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { SpinnerDotted } from "spinners-react";
// @ts-ignore
import image from "@src/assets/emailVerification.svg";

import { validateUserEmail } from "@src/state/stores/user/operations";

function Verification() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [counter, setCounter] = React.useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("emailVerificationToken")) {
      console.log("email");
      setIsLoading(true);
      validateUserEmail(searchParams.get("emailVerificationToken")).then(
        (res) => {
          console.log(res);
          setIsLoading(false);
        }
      );
    } else if (searchParams.get("forgotPasswordToken")) {
      console.log("forgot");
    }
  }, []);

  useEffect(() => {
    const timer: any =
      !isLoading &&
      counter > 0 &&
      setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      navigate("/");
    }
    return () => clearInterval(timer);
  }, [counter, isLoading]);

  return (
    <section className="verificationSection">
      {isLoading ? (
        <SpinnerDotted size="150" color="#8970FA" />
      ) : (
        <>
          <h2 className="has-text-primary is-size-3 has-text-weight-semibold">
            Email Verified !
          </h2>
          <span className="has-text-grey is-size-6">
            Redirecting to Home Page in {counter}...
          </span>
          <img className="verificationSection-image" src={image} alt="" />
        </>
      )}
    </section>
  );
}

export default Verification;
