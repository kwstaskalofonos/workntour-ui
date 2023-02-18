import React, { useEffect } from "react";

// https://github.com/MomenSherif/react-oauth

import { useGoogleLogin } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleOneTapLogin } from "@react-oauth/google";
// @ts-ignore
import googleIcon from "@src/assets/GoogleIcon.png";

const GoogleSignIn: React.FunctionComponent = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      console.log("success");
    },
    onError: (tokenResponse) => {
      console.log(tokenResponse);
      console.log("error");
    },
  });

  return (
    <button
      className={"button is-fullwidth socialMediaButton"}
      onClick={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <img src={googleIcon} />
      Continue with Google
    </button>
  );
};

{
  /* <div style={{ display: "flex", justifyContent: "center" }}>
  <GoogleLogin
    onSuccess={(credentialResponse) => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log("Login Failed");
    }}
    // useOneTap
    // auto_select
    locale="en"
  />
</div>; */
}

export default GoogleSignIn;
