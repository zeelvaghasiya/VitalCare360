import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userInfo } from "../../features/userPatient/userPatientSlice";
import { useNavigate } from "react-router-dom";

function DoctorCard({ info, showPopup, setShowPopup }) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const { user: currentPatient } = useSelector((state) => state.patient);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      dispatch(userInfo());
    } else {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    const getNextSevenDays = () => {
      const today = moment();
      const nextSevenDays = Array.from({ length: 7 }, (_, i) =>
        today.clone().add(i, "days")
      );
      setDates(nextSevenDays);
    };

    getNextSevenDays();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const getDayOfWeek = (date) => {
    return date.format("dddd");
  };

  const handleAppointmentBooking = () => {
    if (selectedDate && selectedTimeSlot) {
      // Send a request to your backend to create a new appointment
      axios
        .post("/api/v1/appointments/book-appointment", {
          patientRef: currentPatient.data._id, // Replace with actual patient ID
          doctorRef: info._id, // Assuming info contains doctor ID
          date: selectedDate.toDate(),
          timeSlot: selectedTimeSlot, // Pass the entire selected time slot object
          appointmentStatus: "pending",
        })
        .then((response) => {
          // Handle response, e.g., show success message
          console.log("Appointment booked successfully!");

          navigate("/patient/my-appointment");
        })
        .catch((error) => {
          // Handle error
          console.error("Error booking appointment:", error);
        });
    } else {
      // Handle case where date or time slot is not selected
      console.error("Please select a date and time slot before booking.");
    }
  };

  console.log("info", info.timeSlots);
  console.log("selected date", selectedTimeSlot);

  return (
    <div className="bg-black bg-opacity-50 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0">
      <div className="rounded-md border bg-white">
        <div className="flex justify-center my-4">
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => setShowPopup(false)}
          >
            Close
          </button>
        </div>
        <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row bg-white shadow-md">
          <div className="h-full w-full p-4">
            <img
              src={info.avatar}
              alt="Doctor"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">
              Dr. {info.fullName}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{info.gender}</p>
            <p className="text-sm text-gray-600">{info.speciality}</p>
            <p className="text-sm text-gray-600">{info.eduQualification[0]}</p>
            <p className="mt-3 text-sm text-gray-600">{info.personalInfo}</p>
            <div className="mt-4">
              <p className="text-lg font-semibold mb-1">Select Date :</p>
              <div>
                {dates.map((date, index) => (
                  <button
                    key={index}
                    className={`mr-2 mb-2 px-3 py-1 rounded-md border ${
                      selectedDate === date
                        ? "bg-gray-200"
                        : "border-gray-400 hover:bg-gray-200"
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date.format("ddd, MMM DD")}
                  </button>
                ))}
              </div>
            </div>
            <div>
              {selectedDate && (
                <>
                  <h2 className="text-lg font-semibold mt-4">Time Slots</h2>
                  <div className="flex flex-wrap">
                    {info.timeSlots
                      .filter(
                        (slot) =>
                          slot.dayOfWeek === getDayOfWeek(selectedDate) &&
                          slot.status !== "Booked"
                      )
                      .map((slot, index) => (
                        <div key={index} className="mt-1 mr-2">
                          <button
                            className={`mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900 ${
                              selectedTimeSlot === slot
                                ? "bg-orange-400 text-white"
                                : ""
                            }`}
                            onClick={() => handleTimeSlotSelect(slot)}
                          >
                            {slot.startTime}
                          </button>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAppointmentBooking}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
