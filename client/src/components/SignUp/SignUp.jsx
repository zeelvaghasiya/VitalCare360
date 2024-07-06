import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { createPatient } from "../../features/auth/authPatient/authPatientSlice.js";
import Message from "../Message/Message.jsx";

function SignUp() {
  const [userData, setUserData] = useState({});
  const [isDoctor, setIsDoctor] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    // console.log("avatar ...",e.target.files[0])
    setUserData({ ...userData, avatar: e.target.files[0] });
  };

  console.log("userData", userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(createPatient(userData));
      console.log("response", response.payload.success);
      if (response.payload.success) {
        setSuccessMessage("Signup successful!");
        setTimeout(() => {
          setSuccessMessage(null);
          navigate("/signin");
        }, 3000);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">{/* add logo here */}</div>
          <h2 className="text-center text-2xl font-bold leading-tight text-blue-400">
            Sign up to create account
          </h2>
          {successMessage ? (
            <Message msg={successMessage} color="green" />
          ) : (
            errorMessage && <Message msg={errorMessage} color="red" />
          )}
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="mt-8"
            encType="multipart/form-data"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="fullName"
                    required
                    name="fullName"
                    onChange={getUserData}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  User Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="User Name"
                    id="username"
                    required
                    name="username"
                    onChange={getUserData}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    required
                    name="email"
                    onChange={getUserData}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="avatar"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Avatar Image{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="file"
                    placeholder="Avatar Image"
                    id="avatar"
                    required
                    name="avatar"
                    onChange={handlePhoto}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="contactNumber"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Contact Number{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Contact Number"
                    id="contactNumber"
                    required
                    name="contactNumber"
                    onChange={getUserData}
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Gender{" "}
                </label>
                <div className="mt-2 flex">
                  <div className="flex items-center">
                    <input
                      className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                      name="gender"
                      value="Male"
                      type="radio"
                      required
                      onChange={getUserData}
                    />
                    <span className="ml-2 text-gray-700 mr-8">Male</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      className="form-radio h-4 w-4 text-gray-600 border-gray-300"
                      name="gender"
                      value="Female"
                      type="radio"
                      onChange={getUserData}
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                    name="password"
                    onChange={getUserData}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-400 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
