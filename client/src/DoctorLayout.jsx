import React from "react";
import Dashboard from "./components/Doctor/Dashboard/Dashboard";
import { Outlet } from "react-router-dom";

function DoctorLayout() {
  return (
    <div className="flex">
      <Dashboard />
      <div className="flex-1 overflow-y-auto pl-64">
        <Outlet />
      </div>
    </div>
  );
}

export default DoctorLayout;
