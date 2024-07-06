import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "../../Message/Message.jsx";

function ManageTimeSlot() {
  const [timeSlots, setTimeSlots] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get("/api/v1/doctors/view-all-timeslots");
      setTimeSlots(response.data.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  const groupByDay = (timeSlots) => {
    return timeSlots.reduce((groupedSlots, slot) => {
      const dayOfWeek = slot.dayOfWeek;
      if (!groupedSlots[dayOfWeek]) {
        groupedSlots[dayOfWeek] = [];
      }
      groupedSlots[dayOfWeek].push(slot);
      return groupedSlots;
    }, {});
  };

  const handleDelete = async (slotId) => {
    try {
      await axios.delete(`/api/v1/doctors/time-slots/${slotId}`);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      // After successful deletion, refetch time slots
      fetchTimeSlots();
    } catch (error) {
      console.error("Error deleting time slot:", error);
      setShowMessage(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4 sm:p-4 lg:p-8 xl:p-12">
      <div className="bg-white w-1/3 sm:w-1/2 p-4 mx-auto shadow-md">
        <h2 className="text-xl text-center font-semibold mb-4">
          Manage Time Slots
        </h2>
        {showMessage && <Message msg="Time slot deleted successfully!" color="green" />}
        <div>
          {timeSlots.length > 0 ? (
            <div>
              {Object.entries(groupByDay(timeSlots)).map(
                ([dayOfWeek, slots], index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{dayOfWeek}</h3>
                    <div className="flex flex-wrap">
                      {slots.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm m-2 flex items-center"
                        >
                          <span>{slot.startTime}</span>
                          <button
                            onClick={() => handleDelete(slot._id)}
                            className="text-red-500 ml-2 focus:outline-none hover:text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-center">No time slots available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageTimeSlot;
