import React from "react";
import { Route, Routes} from "react-router-dom";
import HomePage from "@src/views/traveler/home/HomePage";
import Opportunity from "@src/views/host/opportunities/Opportunity";
import TravelerProfilePage from "@src/views/traveler/profile/TravelerProfilePage";
import PostArticle from "../blog/PostArticle";

import { useAppDispatch, useAppSelector } from "@src/state/stores/hooks";
import {
  TravelerProfile,
} from "@src/state/stores/user/models";


const TravelerRouter: React.FunctionComponent = () =>{
  // for the blog
  const user = useAppSelector(
    (state) =>
      state.session.authenticationSlice.profile as unknown as TravelerProfile
  );
  //   

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="opportunity/:id"
        element={<Opportunity hostMode={false} />}
      />
      <Route path="profile" element={<TravelerProfilePage />} />
      {user?.email === "traveler.workntour@gmail.com" ? (
        <Route path="shareArticle" element={<PostArticle />} />
      ) : null}
    </Routes>
  );
};

export default TravelerRouter;