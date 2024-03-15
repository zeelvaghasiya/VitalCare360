import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { resetStore } from "../../../features/userDoctor/userDoctorSlice";
import { logoutDoctor } from "../../../features/auth/authDoctor/authDoctorSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetStore());
    dispatch(logoutDoctor());
    navigate("/");
  };

  return (
    <aside className="fixed h-screen w-64 overflow-y-auto border-r bg-blue-400 px-5 py-8">
      <Link to="#">
        <span className="text-white text-2xl font-medium">vitalCare360</span>
      </Link>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Time Slots
            </label>
            <button
              className="w-full flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              type="button"
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <Link
                className="text-left w-full mx-2 text-sm font-medium"
                to="add-timeslot"
              >
                Add TimeSlot
              </Link>
            </button>
            <button
              className="w-full flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              type="button"
            >
              <Wallet className="h-5 w-5" aria-hidden="true" />
              <Link
                className="text-left w-full mx-2 text-sm font-medium"
                to="manage-timeslot"
              >
                Manage TimeSlot
              </Link>
            </button>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Appointments
            </label>
            <button
              className="w-full flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              type="button"
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <Link
                className="text-left w-full mx-2 text-sm font-medium"
                to="appointment-table"
              >
                Normal Appointment
              </Link>
            </button>
            <button
              className="w-full flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              type="button"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <Link
                className="text-left w-full mx-2 text-sm font-medium"
                to="meet-appointment-table"
              >
                Google Meet Appointment
              </Link>
            </button>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-white">
              Personal
            </label>
            <button
              className="w-full flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              type="button"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <Link
                className="text-left w-full mx-2 text-sm font-medium"
                to="profile"
              >
                Profile
              </Link>
            </button>
            <button
              className="w-full flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              type="button"
              onClick={handleLogout}
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <Link className="text-left w-full mx-2 text-sm font-medium">
                Logout
              </Link>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Dashboard;
