// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyALeWMNdFiGwtEcjxEaOse9-VAYxYQ_PL8",
    authDomain: "workntour-test.firebaseapp.com",
    projectId: "workntour-test",
    storageBucket: "workntour-test.appspot.com",
    messagingSenderId: "192188677390",
    appId: "1:192188677390:web:f91f737f682bb0415eab5f",
    measurementId: "G-4DZLGQFMEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(initializeApp(firebaseConfig));