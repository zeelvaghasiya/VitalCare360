import axios from "axios";
import React, { useState } from "react";

function AddTimeSlot() {
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timeslot = await axios.post("/api/v1/doctors/add-timeslot", {
        dayOfWeek,
        startTime,
      });

      console.log("timeSlot",timeslot.data);

      setDayOfWeek("");
      setStartTime("");
    } catch (error) {
      console.error("Error adding time slot:", error);
    }
  };

  console.log("day",dayOfWeek);
  console.log("time",startTime);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4 sm:p-4 lg:p-8 xl:p-12">
      <div className="bg-white w-1/3 sm:w-1/2 p-4 mx-auto shadow-md">
        <h2 className="text-lg text-center font-semibold mb-4">
          Create New Time Slot
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Day of Week:</label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
              required
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Time Slot
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTimeSlot;
