import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserInfo,
  userInfo,
} from "../../features/auth/userPatient/userPatientSlice";
import { useNavigate } from "react-router-dom";
import DC from "../../images/DC.png";
import { format } from "date-fns";
import Allergis from "../Allergis/Allergis.jsx";
import ChronicDisease from "../ChronicDisease/ChronicDisease.jsx";
import Injuries from "../Injuries/Injuries.jsx";
import Surgeries from "../Surgeries/Surgeries.jsx";

function Profile() {
  const [patientData, setPatientData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentPatient } = useSelector((state) => state.patient);

  console.log("currentPatient", currentPatient);
  console.log("Patient Data", patientData);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      dispatch(userInfo());
    } else {
      navigate("/signin");
    }
  }, []);

  const handleData = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (currentPatient) {
      setPatientData(currentPatient.data);
    }
  }, [currentPatient]);

  const submitNewData = (e) => {
    e.preventDefault();
    console.log("new data Patient", patientData);
    if (patientData) {
      dispatch(updateUserInfo(patientData));
    }
  };

  return (
    <>
      {patientData && (
        <div className="bg-gray-100 p-4 sm:p-8 lg:p-12 xl:p-24">
          <div className="max-w-md md:max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex justify-center items-center">
            <div className="w-full">
              {/* Profile Photo */}
              <img
                className="mt-4 w-24 h-24 md:w-48 md:h-48 rounded-full md:flex-shrink-0 mx-auto shadow-2xl border-4 border-blue-400"
                src={patientData.avatar}
                alt="Profile"
              />
              <div className="md:text-left">
                <hr className="my-4" />
                <div className="max-w-90 mx-auto">
                  {/* Form */}
                  <form onSubmit={submitNewData}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2">
                      {/* First row of inputs */}
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="username"
                          name="username"
                          value={patientData.username}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="username"
                        >
                          User Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={patientData.fullName}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                      </div>
                      {/* Second row of inputs */}
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="number"
                          id="contactNumber"
                          name="contactNumber"
                          value={patientData.contactNumber}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="contactNumber"
                        >
                          Contact Number
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="email"
                          id="email"
                          name="email"
                          value={patientData.email}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="email"
                        >
                          Email
                        </label>
                      </div>
                      <div className="relative">
                        <div className="flex rounded-md border border-gray-300 px-3 py-2">
                          <div className="flex items-center">
                            <input
                              className="w-full form-radio h-4 text-gray-600 border-gray-300"
                              name="gender"
                              value="Male"
                              checked={patientData.gender === "Male"}
                              type="radio"
                              required
                              onChange={handleData}
                            />
                            <span className="ml-2 text-black mr-8">Male</span>
                          </div>
                          <div className="flex items-center">
                            <input
                              className="form-radio h-4 w-full text-gray-600 border-gray-300"
                              name="gender"
                              value="Female"
                              checked={patientData.gender === "Female"}
                              type="radio"
                              onChange={handleData}
                            />
                            <span className="ml-2 text-black">Female</span>
                          </div>
                        </div>
                      </div>
                      {/* Third row of inputs */}
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="date"
                          id="DOB"
                          name="DOB"
                          value={
                            patientData.DOB
                              ? format(new Date(patientData.DOB), "yyyy-MM-dd")
                              : ""
                          }
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="DOB"
                        >
                          Date of Birth
                        </label>
                      </div>
                      <div className="relative">
                        <select
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          id="bloodGroup"
                          required
                          name="bloodGroup"
                          value={patientData.bloodGroup}
                          onChange={handleData}
                        >
                          <option value="" disabled selected hidden>
                            Choose a Blood Group
                          </option>
                          <option value="A+">A+</option>
                          <option value="B+">B+</option>
                          <option value="AB+">AB+</option>
                          <option value="O+">O+</option>
                          <option value="A-">A-</option>
                          <option value="B-">B-</option>
                          <option value="AB-">AB-</option>
                          <option value="O-">O-</option>
                        </select>
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="bloodGroup"
                        >
                          Blood Group
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="number"
                          id="height"
                          name="height"
                          value={patientData.height}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="height"
                        >
                          Height (in cm)
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="number"
                          id="weight"
                          name="weight"
                          value={patientData.weight}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="weight"
                        >
                          Weight (in kg)
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-2 md:space-y-0">
                      <button
                        type="submit"
                        className="rounded-md mx-auto bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Edit Info
                      </button>
                    </div>
                  </form>
                </div>

                <hr className="my-6" />
                <div className="max-w-90 m-2">
                  <div>
                    <h2 className="text-center text-lg font-semibold leading-tight text-black sm:text-xl lg:text-2xl lg:leading-tight">
                      Allergis
                    </h2>
                  </div>
                  <Allergis />
                </div>
                <hr className="my-4" />
                <div className="max-w-90 m-2">
                  <div>
                    <h2 className="text-center text-lg font-semibold leading-tight text-black sm:text-xl lg:text-2xl lg:leading-tight">
                      ChronicDisease
                    </h2>
                  </div>
                  <ChronicDisease />
                </div>
                <hr className="my-4" />
                <div className="max-w-90 m-2">
                  <div>
                    <h2 className="text-center text-lg font-semibold leading-tight text-black sm:text-xl lg:text-2xl lg:leading-tight">
                      Injuries
                    </h2>
                  </div>
                  <Injuries />
                </div>
                <hr className="my-4" />
                <div className="max-w-90 m-2">
                  <div>
                    <h2 className="text-center text-lg font-semibold leading-tight text-black sm:text-xl lg:text-2xl lg:leading-tight">
                      Surgeries
                    </h2>
                  </div>
                  <Surgeries />
                </div>
                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
