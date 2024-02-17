import { configureStore } from "@reduxjs/toolkit";
import  authPatient  from "../features/auth/authPatient/authPatientSlice";
import  userPatient  from "../features/auth/userPatient/userPatientSlice";

export const store = configureStore({
  reducer: {
    auth : authPatient,
    patient : userPatient
  },
});