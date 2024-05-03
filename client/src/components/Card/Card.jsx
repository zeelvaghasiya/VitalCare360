import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DoctorCard from "../DoctorCard/DoctorCard";
import AOS from "aos";
import "aos/dist/aos.css";

function Card({ info, videoConsult }) {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      {showPopup && (
        <DoctorCard
          info={info}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          videoConsult={videoConsult}
        />
      )}
      <div
        className="w-[250px] mx-auto rounded-md border shadow-lg"
        data-aos="flip-up"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
      >
        <div className="mx-auto h-32 w-32 flex items-center justify-center outline-none rounded-full overflow-hidden">
          <img
            src={info.avatar}
            className="h-24 w-24 rounded-full object-cover"
            alt="Cardiology"
          />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Dr. {info.fullName}</h1>
          <div className="p-6">
            <p className=" text-gray-600 text-base text-left">
              <span className="font-bold text-gray-800">Email : </span>
              {info.email}{" "}
            </p>
            <p className=" text-gray-600 text-base text-left">
              <span className="font-bold text-gray-800">Fees : </span>Rs:200
            </p>
            <p className="mb-6 text-gray-600 text-base text-left">
              <span className="font-bold text-gray-800">Phone : </span>
              {info.contactNumber}
            </p>
            <button
              className="rounded-md bg-blue-400 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => setShowPopup(true)}
            >
              View more Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
