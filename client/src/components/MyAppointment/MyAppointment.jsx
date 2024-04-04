import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyAppointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "/api/v1/appointments/get-all-appointment-patient"
        );
        if (response.status === 200) {
          setAppointments(response.data.data);
          // response.data gives APIResponse format response and from that if we want fetch array of appointment then use .data property
        } else {
          throw new Error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []);

  console.log("app", appointments);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4 overflow-hidden">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="mx-auto">
          <h2 className="text-center text-2xl text-blue-400 font-semibold">
            Appointments
          </h2>
          <p className="text-center mt-1 text-lg text-gray-700">
            This is a list of your all appointments.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                    >
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                    >
                      Doctor
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                    >
                      Appointment Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                    >
                      Appointment Time
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                    >
                      Meet Link
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appointment, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-left">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">
                              {appointment.patientRef.fullName}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">
                            Dr. {appointment.doctorRef.fullName}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(appointment.date).toDateString()}
                        </td>
                        <td className="px-4 py-3">{appointment.startTime}</td>
                        <td className="px-4 py-3">
                          {appointment.meetLink ? (
                            <Link
                              to={`https://meet.google.com/hks-tchs-inh`}
                              className="text-blue-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Join Meeting
                            </Link>
                          ) : (
                            <span className="text-gray-500">No Link Available</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-2 py-1 rounded-md text-sm ${
                              appointment.appointmentStatus === "completed"
                                ? "bg-green-200 text-green-800"
                                : appointment.appointmentStatus === "booked"
                                ? "bg-blue-200 text-blue-800"
                                : appointment.appointmentStatus === "canceled"
                                ? "bg-red-200 text-red-800"
                                : appointment.appointmentStatus === "pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : "" // to prevent error
                            }`}
                          >
                            {appointment.appointmentStatus
                              .charAt(0)
                              .toUpperCase() +
                              appointment.appointmentStatus.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAppointment;
