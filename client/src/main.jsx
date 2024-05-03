import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import { store } from "./app/store.js";
import MainPage from "./components/MainInterface/MainPage/MainPage.jsx";
import MainLayout from "./MainLayout.jsx";
import DoctorLayout from "./DoctorLayout.jsx"
import DProfile from "./components/Doctor/DProfile/DProfile.jsx";
import AddTimeSlot from "./components/Doctor/AddTimeSlot/AddTimeSlot.jsx";
import ManageTimeSlot from "./components/Doctor/ManageTimeSlot/ManageTimeSlot.jsx";
import MyAppointment from "./components/MyAppointment/MyAppointment.jsx";
import AppointmentTable from "./components/Doctor/AppointmentTable/AppointmentTable.jsx";
import MeetAppointmentTable from "./components/Doctor/MeetAppointmentTable/MeetAppointmentTable.jsx";
import MedicalRecord from "./components/MedicalRecord/MedicalRecord.jsx";
import PatientDetails from "./components/Doctor/PatientDetails/PatientDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
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
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/doctor",
    element: <DoctorLayout />,
    children: [
      {
        path: "add-timeslot",
        element: <AddTimeSlot />,
      },
      {
        path: "manage-timeslot",
        element: <ManageTimeSlot />,
      },
      {
        path: "appointment-table",
        element: <AppointmentTable />
      },
      {
        path: "meet-appointment-table",
        element: <MeetAppointmentTable />
      },
      {
        path: "patient-details",
        element: <PatientDetails />,
      },
      {
        path: "profile",
        element: <DProfile />,
      },
      {
        path: "*", // Error page should also be relative
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/patient",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "my-appointment",
        element: <MyAppointment />,
      },
      {
        path: "medical-records",
        element: <MedicalRecord />,
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
        path: "doctorlist/:diagnosis",
        element: <DoctorList />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*", // Error page should also be relative
        element: <ErrorPage />,
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
  },
  {
    path: "/doctorSignup", // Relative path to the parent route
    element: <DoctorForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
