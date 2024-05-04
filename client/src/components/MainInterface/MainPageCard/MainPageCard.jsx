import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function MainPageCard({ userInfo, url }) {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="w-[300px] rounded-md border mb-4 mr-8" data-aos="zoom-in">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-2 flex justify-items-center">
        <button
          type="button"
          className="w-full rounded-md bg-blue-400 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <Link
            to={url}
            onClick={() => {
              userInfo == "Doctor"
                ? localStorage.setItem("isDoc", true)
                : localStorage.setItem("isDoc", false);
            }}
          >
            Login/SignUp as a {userInfo}
          </Link>
        </button>
      </div>
    </div>
  );
}

export default MainPageCard;
