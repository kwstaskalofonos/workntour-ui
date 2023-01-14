import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./views/routers/AppRouter";
import "./assets/main.scss";
import { ToastContainer } from "react-toastify";
import { store } from "@src/state/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="192188677390-7dmlb5l5ndlreu8pbfl1clnrc8c6shab.apps.googleusercontent.com">
      <Provider store={store}>
        <AppRouter />
        <ToastContainer autoClose={2000} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
