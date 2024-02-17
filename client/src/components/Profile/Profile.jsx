import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../features/auth/userPatient/userPatientSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authPatient/authPatientSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentPatient } = useSelector((state) => state.patient);

  console.log("currentPatient", currentPatient);

  useEffect(() => {
    if(localStorage.getItem("userToken")){
      dispatch(userInfo())
    }
    else{
      navigate("/signin")
    }
  },[])

  return (
    <>
      <h1>My name is Zeel</h1>
      {currentPatient && currentPatient.data && (
        <div>
          <p>Username: {currentPatient.data.username}</p>
          <p>Email: {currentPatient.data.email}</p>
          <p>Gender: {currentPatient.data.gender}</p>
        </div>
      )}
    </>
  );
}

export default Profile;
