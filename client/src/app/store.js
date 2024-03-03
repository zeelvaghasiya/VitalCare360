import { configureStore } from "@reduxjs/toolkit";
import  authPatient  from "../features/auth/authPatient/authPatientSlice";
import  userPatient  from "../features/userPatient/userPatientSlice";
import  authDoctor  from "../features/auth/authDoctor/authDoctorSlice";
import userDoctor from "../features/userDoctor/userDoctorSlice";

export const store = configureStore({
  reducer: {
    auth : authPatient,
    patient : userPatient,
    authD : authDoctor,
    doctor : userDoctor
  }
});