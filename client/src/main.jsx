import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import SignIn from "../src/components/SignIn/SignIn.jsx";
import SignUp from "../src/components/SignUp/SignUp.jsx";
import Home from "../src/components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import DiagnosisList from "./components/DiagnosisList/DiagnosisList.jsx";
import DoctorList from "./components/DoctorList/DoctorList.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Profile from "./components/Profile/Profile.jsx";
import DoctorForm from "./components/DoctorForm/DoctorForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "diagnosislist",
        element: <DiagnosisList />,
      },
      {
        path: "diagnosislist/doctorlist",
        element: <DoctorList />,
      },
      {
        path: "/doctorform",
        element: <DoctorForm/>
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <ErrorPage/>
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
