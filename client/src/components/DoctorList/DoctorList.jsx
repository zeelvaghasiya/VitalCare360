import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card.jsx";

function DoctorList() {
  const { diagnosis } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [searchData, setSearchData] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const videoConsult = params.get("videoConsult");

  console.log("inside doctorList", videoConsult);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `/api/v1/doctors/getAllDoctorByCategory/${diagnosis}`
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (diagnosis) {
      fetchDoctors();
    }
  }, [diagnosis]);

  console.log("doctor", doctors.data);

  return (
    <div className="flex flex-col items-center">
      {diagnosis && (
        <>
          <div className="mt-5 text-lg font-semibold">
            Doctors for {diagnosis}
          </div>
          <div className="my-5">
            <input
              type="text"
              placeholder="Search doctors"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="p-2 border border-blue-400 rounded-md text-center outline-none"
            />
          </div>
        </>
      )}
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.data &&
          doctors.data
            .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.fullName
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
                  {/* console.log("element",ele); */}
              }
            })
            .map((doctor) => (
              <div key={doctor._id}>
                <Card info={doctor} videoConsult={videoConsult} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default DoctorList;
