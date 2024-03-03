import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";

const bookAppointment = asyncHandler(async (req, res) => {
  // Extract appointment details from the request body
  const { patientRef, doctorRef, date, timeSlot } = req.body;

  // Check for existing appointments for the selected date and time slot
  const existingAppointment = await Appointment.findOne({
    doctorRef,
    date,
    startTime: timeSlot.startTime,
    appointmentStatus: { $ne: "canceled" }, // Exclude canceled appointments
  });

  // Check the status of the selected time slot
  if (timeSlot.status !== "Available") {
    throw new ApiError(400, "Selected time slot is not available.");
  }

  // If there's an existing appointment, return an error
  if (existingAppointment) {
    throw new ApiError(400, "Appointment collision detected.");
  }

  // Create a new appointment record
  const appointment = await Appointment.create({
    patientRef,
    doctorRef,
    date,
    startTime: timeSlot.startTime,
    appointmentStatus: "pending",
  });

  const createdAppointment = await Appointment.findById(appointment._id);

  if (!createdAppointment) {
    throw new ApiError(
      500,
      "Something went wrong while creating the appointment"
    );
  }

  // Update the status of the selected time slot to "Booked"
  // Find the doctor by doctorRef
  const doctor = await Doctor.findById(doctorRef);

  if (!doctor) {
    throw new ApiError(500, "Doctor not found");
  }

  // Update the status of the selected time slot to "Booked"
  const updatedTimeSlot = doctor.timeSlots.find(
    (slot) =>
      slot.startTime === timeSlot.startTime &&
      slot.dayOfWeek === timeSlot.dayOfWeek
  );

  if (!updatedTimeSlot) {
    throw new ApiError(500, "Time slot not found");
  }

  updatedTimeSlot.status = "Booked"; // Or update according to your business logic

  // Save the updated doctor document
  await doctor.save();

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdAppointment,
        "Appointment booked successfully."
      )
    );
});

export { bookAppointment };
