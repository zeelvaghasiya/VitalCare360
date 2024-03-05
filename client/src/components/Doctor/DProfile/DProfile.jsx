import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  doctorInfo,
  updateDoctorInfo,
} from "../../../features/userDoctor/userDoctorSlice";
import axios from "axios";
import { ApiError } from "../../../../../backend/src/utils/ApiError";

function DProfile() {
  const [doctorData, setDoctorData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentDoctor } = useSelector((state) => state.doctor);

  console.log("currentDoctor", currentDoctor);
  console.log("Doctor Data", doctorData);

  useEffect(() => {
    if (localStorage.getItem("doctorToken")) {
      dispatch(doctorInfo());
    } else {
      navigate("/signin");
    }
  }, []);

  const handleData = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  useEffect(() => {
    if (currentDoctor) {
      setDoctorData(currentDoctor.data);
    }
  }, [currentDoctor]);

  const submitNewData = (e) => {
    e.preventDefault();
    console.log("new data Doctor", doctorData);
    if (doctorData) {
      dispatch(updateDoctorInfo(doctorData));
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { value } = e.target;
    setDoctorData({ ...doctorData, personalInfo: value });
  };

  const editPersonalInfo = async () => {
    try {
      const response = await axios.patch(
        "/api/v1/doctors/edit-doctor-personal-info",
        {
          personalInfo: doctorData.personalInfo,
        }
      );
      console.log("edit doctor personal information", response.data);
      setDoctorData({ ...doctorData, personalInfo: doctorData.personalInfo });
    } catch (error) {
      throw new ApiError(402, "error while edit the personal information");
    }
  };

  return (
    <>
      {doctorData && (
        <div className="bg-gray-100 p-4 sm:p-8 lg:p-12 xl:p-24">
          <div className="max-w-md md:max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex justify-center items-center">
            <div className="w-full">
              {/* Profile Photo */}
              <img
                className="mt-4 w-24 h-24 md:w-48 md:h-48 rounded-full md:flex-shrink-0 mx-auto shadow-2xl border-4 border-blue-400 object-cover"
                src={doctorData.avatar}
                alt="Profile"
              />
              <div className="md:text-left">
                <hr className="my-4" />
                <div className="max-w-90 mx-auto">
                  <form onSubmit={submitNewData}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2">
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={doctorData.fullName}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="number"
                          id="contactNumber"
                          name="contactNumber"
                          value={doctorData.contactNumber}
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
                          value={doctorData.email}
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
                              checked={doctorData.gender === "Male"}
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
                              checked={doctorData.gender === "Female"}
                              type="radio"
                              onChange={handleData}
                            />
                            <span className="ml-2 text-black">Female</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="speciality"
                          name="speciality"
                          value={doctorData.speciality}
                          onChange={handleData}
                        />
                        <label
                          className="absolute left-0 top-0 -translate-y-1/2 px-1 bg-white text-xs text-gray-400"
                          htmlFor="speciality"
                        >
                          Speciality
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
                <hr className="mt-6" />
                <div className="w-full mx-auto flex justify-center items-center">
                  <div className="w-full p-4">
                    <h2 className="mb-4">Add Personal Information</h2>
                    <textarea
                      className="w-full h-32 border border-gray-300 p-2 rounded-md"
                      value={doctorData.personalInfo}
                      onChange={handlePersonalInfoChange}
                      placeholder="Enter your personal information here..."
                    />
                    <button
                      className="mt-2 rounded-md mx-auto bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={editPersonalInfo}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DProfile;
