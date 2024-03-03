import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/MainInterface/Header/Header.jsx";
import Footer from "./components/MainInterface/Footer/Footer.jsx";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
