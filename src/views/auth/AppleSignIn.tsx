import React from "react";
import AppleLogin from "react-apple-login";
// @ts-ignore
import appleIcon from "@src/assets/AppleIcon.png";

const AppleSignIn: React.FunctionComponent = () => {
  const appleResponse = (response: any) => {
    if (!response.error) {
      console.log(response);
    }
  };

  return (
    <AppleLogin
      clientId="com.workntour.web"
      redirectURI="https://www.workntour.com"
      // usePopup={true}
      callback={appleResponse} // Catch the response
      scope="email name"
      responseMode="query"
      render={(
        renderProps //Custom Apple Sign in Button
      ) => (
        <button
          onClick={renderProps.onClick}
          className={"button is-fullwidth socialMediaButton"}
        >
          <i className="fa-brands fa-apple px-2 " />
          Continue with Apple
        </button>
      )}
    />
  );
};

export default AppleSignIn;
