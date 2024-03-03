import React, { useState, useEffect } from "react";
import DoctorCard from "../DoctorCard/DoctorCard.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card.jsx";

function DoctorList() {
  const { diagnosis } = useParams();
  const [doctors, setDoctors] = useState([]);

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

  console.log("doctor", doctors);

  return (
    <div className="flex flex-col items-center">
      {diagnosis && (
        <div className="mt-5 text-lg font-semibold">
          Doctors for {diagnosis}
        </div>
      )}
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.data &&
          doctors.data.map((doctor) => (
            <div key={doctor._id}>
              <Card info={doctor} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DoctorList;
