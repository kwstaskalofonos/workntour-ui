import React, {useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import {isDevServer} from "../../../webpack/env";
import {store} from "@src/state/store";
import PrivateRoute from "./PrivateRoute";
import TravelerRegisterPage from "@src/views/auth/TravelerRegisterPage";
import CheckInboxPage from "@src/views/auth/CheckInboxPage";
import ErrorPage from "@src/views/common/ErrorPage";
import HostRegisterPage from "@src/views/auth/HostRegisterPage";
// @ts-ignore
import {doSetProfile, doSetRole, retrieveUserProfile, updateUserInfo} from "@src/state/stores/user/operations";
import {getCookie, hasCookie} from "@src/utilities/cookies";
import LandingPage from "@src/views/LandingPage";
import SecuredSiteRouter from "@src/views/routers/SecureSiteRouter";
import {useAppDispatch, useAppSelector} from "@src/state/stores/hooks";
import {CompanyHostProfile, IndividualHostProfile, Role, TravelerProfile} from "@src/state/stores/user/models";
import {SessionStorage} from "@src/utilities/localStorage";
import AboutPage from "@src/views/AboutPage";
import BlogPage from "@src/views/blog/BlogPage";
import ViewArticle from "../blog/ViewArticle";
import ScrollToTop from "../common/ScrollToTop";

import Footer from "../common/Footer";
import TopMenu from "../common/TopMenu";

const AppRouter :React.FunctionComponent = () =>{

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector((state)=>state.session.authenticationSlice.profile);
    const userRole = useAppSelector((state)=>state.session.authenticationSlice.role);

    useEffect(()=>{
        if(!userRole&&hasCookie('role')){
            dispatch(doSetRole(getCookie('role')))
        }
    },[])

    useEffect(()=>{
        if(userRole){
            if(!SessionStorage.getItem('profile')){
                dispatch(updateUserInfo(userRole));
                return;
            }
            if(userRole === Role.TRAVELER.toString()){
                let profile:TravelerProfile|null = SessionStorage.getItem('profile');
                dispatch(doSetProfile(profile));
            }else if(userRole === Role.INDIVIDUAL_HOST.toString()){
                let profile:IndividualHostProfile|null = SessionStorage.getItem('profile');
                dispatch(doSetProfile(profile));
            }else if(userRole === Role.COMPANY_HOST.toString()){
                let profile:CompanyHostProfile|null = SessionStorage.getItem('profile');
                dispatch(doSetProfile(profile));
            }
        }
    },[userRole])


    return (
      <Router>
        <TopMenu />
        <ScrollToTop>
          <div style={{ paddingTop: "60px" }}>
            <Routes>
              <Route
                path="/registerAsTraveler"
                element={<TravelerRegisterPage />}
              />
              <Route path="/registerAsHost" element={<HostRegisterPage />} />
              <Route path="/check-inbox" element={<CheckInboxPage />} />
              <Route path="/not-found" element={<ErrorPage />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />

              <Route path="/article/:id" element={<ViewArticle />} />
              <Route
                path="*"
                element={
                  <PrivateRoute>
                    <SecuredSiteRouter />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </ScrollToTop>
        <Footer />
      </Router>
    );
}

export default AppRouter;