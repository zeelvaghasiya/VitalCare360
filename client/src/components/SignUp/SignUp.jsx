import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { createPatient } from "../../features/auth/authPatient/authPatientSlice.js";

function SignUp() {
  const [userData, setUserData] = useState({});
  const [isDoctor, setIsDoctor] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const response =await dispatch(createPatient(userData));
      console.log("response",response.payload.success)
      if (response.payload.success) {
        window.alert("Signup successful!")
        navigate("/signin");
      } else {
        window.alert("An error occurred. Please try again later.")
      }
    } catch (error) {
      console.error("Error:", error);
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
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
