import React from "react";
import MainPageCard from "../MainPageCard/MainPageCard";

function MainPage() {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="flex flex-col justify-center lg:col-span-7 lg:gap-x-6 lg:px-6 xl:col-span-6">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            HealthLink: Easy Booking, Personalized Records
          </h1>
          <div className="mt-6 flex flex-wrap justify-center">
            <MainPageCard userInfo="Patient" url="/signup" />
            <MainPageCard userInfo="Doctor" url="/doctorSignup" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
