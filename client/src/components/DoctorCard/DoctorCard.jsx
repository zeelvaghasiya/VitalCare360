import { ArrowUpRight } from "lucide-react";
import React from "react";

function DoctorCard() {
  return (
    <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row bg-white shadow-md">
      <div className="h-full w-full p-4">
        <img
          src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="Doctor"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          Dr. zeel vaghasiya
        </h1>
        <p className="mt-2 text-sm text-gray-600">Male</p>
        <p className="text-sm text-gray-600">General Physician</p>
        <p className="text-sm text-gray-600">MBBS</p>
        <p className="mt-3 text-sm text-gray-600">
          Dr. Zeel Vaghasiya is a dedicated cardiologist known for his compassionate care and expertise in treating cardiovascular diseases. With over 15 years of experience, he provides personalized treatment and strives for the well-being of his patients.
        </p>
        <div className="mt-4">
          <p className="text-lg font-semibold mb-1">Visit slots :</p>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            8.30AM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            9.00AM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            9.30AM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            10.00AM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            10.30AM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            11.00AM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            3.00PM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            3.30PM
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
            5.30PM
          </span>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
