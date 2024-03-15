import React from "react";
import { Link, useLocation } from "react-router-dom";
import physicianLogo from "../../images/physicianLogo.png";
import hairLogo from "../../images/hairLogo.png";
import womenLogo from "../../images/womenLogo.png";
import dentalCareLogo from "../../images/dentalCareLogo.png";
import childLogo from "../../images/childLogo.png";
import physiotherapyLogo from "../../images/physiotherapyLogo.png";
import eyeLogo from "../../images/eyeLogo.png";
import heartLogo from "../../images/heartLogo.png";

function DiagnosisList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoConsult = params.get("videoConsult");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-5">
        <div className="mb-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Link
              to={{
                pathname: "/patient/doctorlist/GeneralPhysician",
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-150 transition-transform duration-300"
                src={physicianLogo}
                alt="Physician Logo"
              />
            </Link>
          </div>
          <h3 className="mt-4 sm:mt-8 text-lg font-semibold text-black">
            General Physician
          </h3>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
            <Link
              to={{
                pathname: `/patient/doctorlist/SkinAndHair`,
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-150 transition-transform duration-300"
                src={hairLogo}
              />
            </Link>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Skin and Hair
          </h3>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <Link
              to={{
                pathname: `/patient/doctorlist/WomenHealth`,
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-150 transition-transform duration-300"
                src={womenLogo}
              />
            </Link>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Women's Health
          </h3>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Link
              to={{
                pathname: `/patient/doctorlist/DentalCare`,
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-150 transition-transform duration-300"
                src={dentalCareLogo}
              />
            </Link>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Dental Care</h3>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Link
              to={{
                pathname: `/patient/doctorlist/ChildSpecialist`,
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-150 transition-transform duration-300"
                src={childLogo}
              />
            </Link>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Child's Specialist
          </h3>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <Link
              to={{
                pathname: `/patient/doctorlist/Physiotherapist`,
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-150 transition-transform duration-300"
                src={physiotherapyLogo}
              />
            </Link>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Physiotherapist
          </h3>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <Link
              to={{
                pathname: `/patient/doctorlist/EyeSpecialist`,
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-150 transition-transform duration-300"
                src={eyeLogo}
              />
            </Link>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">
            Eye Specialist
          </h3>
        </div>
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <Link
              to={{
                pathname: `/patient/doctorlist/Heart`,
                search: `?videoConsult=${videoConsult}`,
              }}
            >
              <img
                className="h-12 w-12 text-blue-600 hover:scale-125 transition-transform duration-300"
                src={heartLogo}
              />
            </Link>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Heart</h3>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisList;
