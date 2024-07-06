import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginPatient } from "../../features/auth/authPatient/authPatientSlice";
import { loginDoctor } from "../../features/auth/authDoctor/authDoctorSlice";
import Message from "../Message/Message";

function SignIn() {
  const [loginData, setLoginData] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  console.log(loginData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isDoc = localStorage.getItem("isDoc");
      const response =
        isDoc === "true"
          ? await dispatch(loginDoctor(loginData))
          : await dispatch(loginPatient(loginData));

      if (response.payload.success) {
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          setSuccessMessage(null);
          navigate(isDoc === "true" ? "/doctor/add-timeslot" : "/patient/home");
        }, 3000);

        if (isDoc === "true") {
          localStorage.removeItem("isDoc");
        }
      } else {
        setErrorMessage("Invalid username or password.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setTimeout(() => setErrorMessage(null), 3000);
      console.error(error);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">{/* add logo here */}</div>
          <h2 className="text-center text-2xl font-bold leading-tight text-blue-400">
            Sign in to your account
          </h2>
          {successMessage ? (
            <Message msg={successMessage} color="green" />
          ) : (
            errorMessage && <Message msg={errorMessage} color="red" />
          )}
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to={
                localStorage.getItem("isDoc") === "true"
                  ? "/doctorSignup"
                  : "/signup"
              }
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form
            action="#"
            method="POST"
            className="mt-8"
            onSubmit={handleSubmit}
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
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
                    name="email"
                    onChange={getLoginData}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  {/* <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a> */}
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={getLoginData}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-400 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
