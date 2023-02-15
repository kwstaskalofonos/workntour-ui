import React from "react";
import { useEffect } from "react";
import { RouteProps} from "react-router-dom"
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop: React.FunctionComponent<RouteProps> = ({ children }) => {
  const location = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo({
        top: 0,
        // behavior: "smooth",
      });
    }
  }, [location]);
  return <>{children}</>;
};


export default ScrollToTop;
